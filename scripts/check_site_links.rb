#!/usr/bin/env ruby
# frozen_string_literal: true

require "cgi"
require "pathname"

ROOT = File.expand_path("..", __dir__)
SITE_DIR = File.join(ROOT, "_site")

abort("Missing #{SITE_DIR}. Run `bundle exec jekyll build` first.") unless Dir.exist?(SITE_DIR)

def read_utf8(path)
  File.read(path, mode: "r:BOM|UTF-8")
rescue ArgumentError
  File.read(path).encode("UTF-8", invalid: :replace, undef: :replace, replace: "")
end

def anchor_set_for(path, cache)
  return cache[path] if cache.key?(path)

  html = read_utf8(path)
  ids = html.scan(/\sid=(['"])(.*?)\1/).map { |m| CGI.unescapeHTML(m[1]) }
  names = html.scan(/\sname=(['"])(.*?)\1/).map { |m| CGI.unescapeHTML(m[1]) }
  cache[path] = (ids + names).to_set
end

def resolve_path(site_dir, source_file, href_path)
  if href_path.start_with?("/")
    base = File.join(site_dir, href_path.sub(%r{^/}, ""))
  else
    base = File.expand_path(href_path, File.dirname(source_file))
  end

  candidates = []
  candidates << base
  candidates << "#{base}.html" if File.extname(base).empty?
  candidates << File.join(base, "index.html")
  candidates << "#{base}/index.html" unless base.end_with?("/")

  candidates.find { |candidate| File.file?(candidate) }
end

require "set"

errors = []
anchor_cache = {}

html_files = Dir.glob(File.join(SITE_DIR, "**", "*.html"))

html_files.each do |source_file|
  source_rel = Pathname.new(source_file).relative_path_from(Pathname.new(ROOT)).to_s
  html = read_utf8(source_file)
  hrefs = html.scan(/href=(['"])(.*?)\1/i).map { |m| m[1] }.uniq

  hrefs.each do |href|
    next if href.nil? || href.empty?
    next if href.start_with?("http://", "https://", "mailto:", "tel:", "javascript:", "data:", "blob:")

    path_part, fragment = href.split("#", 2)
    decoded_fragment = fragment && CGI.unescapeHTML(fragment)

    if href.start_with?("#")
      next if decoded_fragment.to_s.empty?
      anchors = anchor_set_for(source_file, anchor_cache)
      unless anchors.include?(decoded_fragment.to_s)
        errors << "#{source_rel}: missing anchor ##{decoded_fragment}"
      end
      next
    end

    next if path_part.nil? || path_part.empty?

    target_file = resolve_path(SITE_DIR, source_file, path_part)
    unless target_file
      errors << "#{source_rel}: broken link #{href}"
      next
    end

    next if decoded_fragment.nil? || decoded_fragment.empty?

    anchors = anchor_set_for(target_file, anchor_cache)
    target_rel = Pathname.new(target_file).relative_path_from(Pathname.new(ROOT)).to_s
    unless anchors.include?(decoded_fragment)
      errors << "#{source_rel}: broken anchor #{href} (anchor not found in #{target_rel})"
    end
  end
end

if errors.empty?
  puts "Internal link check passed across #{html_files.length} HTML files."
  exit 0
end

warn "Internal link check failed with #{errors.length} issue(s):"
errors.each { |err| warn "- #{err}" }
exit 1
