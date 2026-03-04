#!/usr/bin/env ruby
# frozen_string_literal: true

ROOT = File.expand_path("..", __dir__)
SITE_DIR = File.join(ROOT, "_site")

abort("Missing #{SITE_DIR}. Run `bundle exec jekyll build` first.") unless Dir.exist?(SITE_DIR)

TARGET_PAGES = {
  "index.html" => "index.html",
  "research/index.html" => "_pages/research.md",
  "teaching/index.html" => "_pages/teaching.md"
}.freeze

def read_utf8(path)
  File.read(path, mode: "r:BOM|UTF-8")
rescue ArgumentError
  File.read(path).encode("UTF-8", invalid: :replace, undef: :replace, replace: "")
end

def attr_value(tag, attr_name)
  match = tag.match(/\b#{Regexp.escape(attr_name)}\s*=\s*(['"])(.*?)\1/i)
  match && match[2]
end

def hidden_input?(tag)
  type = attr_value(tag, "type")
  type && type.strip.casecmp("hidden").zero?
end

def non_text_control?(tag)
  type = attr_value(tag, "type")
  return false unless type

  %w[submit reset button image].include?(type.strip.downcase)
end

errors = []

TARGET_PAGES.each do |rel_path, source_rel_path|
  full_path = File.join(SITE_DIR, rel_path)
  unless File.file?(full_path)
    errors << "Missing target page: _site/#{rel_path}"
    next
  end

  source_path = File.join(ROOT, source_rel_path)
  if File.file?(source_path) && File.mtime(source_path) > File.mtime(full_path)
    warn "Skipping _site/#{rel_path}: build output is older than #{source_rel_path}. Rebuild site first."
    next
  end

  html = read_utf8(full_path)
  page_label = "_site/#{rel_path}"

  img_tags = html.scan(/<img\b[^>]*>/i)
  img_tags.each do |tag|
    next if tag.match?(/\balt\s*=/i)
    errors << "#{page_label}: image tag missing `alt` attribute"
  end

  source_text = File.file?(source_path) ? read_utf8(source_path) : ""
  source_heading_levels = source_text.scan(/<h([1-6])\b/i).flatten.map(&:to_i)
  previous = nil
  source_heading_levels.each do |level|
    if previous && level > previous + 1
      errors << "#{source_rel_path}: heading level jumps from h#{previous} to h#{level}"
      break
    end
    previous = level
  end

  controls = html.scan(/<(?:input|select|textarea)\b[^>]*>/i)

  controls.each do |tag|
    next if hidden_input?(tag)
    next if non_text_control?(tag)

    has_aria = tag.match?(/\baria-label\s*=/i) || tag.match?(/\baria-labelledby\s*=/i)
    id = attr_value(tag, "id")

    if has_aria
      next
    elsif id && !id.strip.empty?
      label_match = html.match(/<label\b[^>]*for=(['"])#{Regexp.escape(id)}\1/i)
      errors << "#{page_label}: control ##{id} is missing an associated <label>" unless label_match
    else
      errors << "#{page_label}: form control missing id and accessible label"
    end
  end
end

if errors.empty?
  puts "Accessibility audit passed for key pages (index, research, teaching)."
  exit 0
end

warn "Accessibility audit failed with #{errors.length} issue(s):"
errors.each { |message| warn "- #{message}" }
exit 1
