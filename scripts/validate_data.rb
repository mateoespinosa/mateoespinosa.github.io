#!/usr/bin/env ruby
# frozen_string_literal: true

require "date"
require "yaml"

ROOT = File.expand_path("..", __dir__)
DATA_DIR = File.join(ROOT, "_data")

def load_yaml(path)
  YAML.safe_load(File.read(path), permitted_classes: [Date], aliases: false)
rescue Psych::Exception => e
  abort("YAML parse error in #{path}: #{e.message}")
end

def present_string?(value)
  value.is_a?(String) && !value.strip.empty?
end

def require_keys!(errors, object, required_keys, context)
  missing = required_keys.reject { |key| object.key?(key) }
  return if missing.empty?

  errors << "#{context}: missing keys #{missing.join(', ')}"
end

def reject_unknown_keys!(errors, object, allowed_keys, context)
  unknown = object.keys - allowed_keys
  return if unknown.empty?

  errors << "#{context}: unknown keys #{unknown.join(', ')}"
end

errors = []

news = load_yaml(File.join(DATA_DIR, "news.yml"))
unless news.is_a?(Hash) && news["items"].is_a?(Array)
  errors << "news.yml: top-level `items` must be an array"
else
  news["items"].each_with_index do |item, idx|
    context = "news.yml item #{idx + 1}"
    unless item.is_a?(Hash)
      errors << "#{context}: item must be a mapping"
      next
    end

    require_keys!(errors, item, %w[date label featured content_html], context)
    reject_unknown_keys!(errors, item, %w[date label featured content_html], context)

    if item.key?("date")
      begin
        Date.iso8601(item["date"].to_s)
      rescue ArgumentError
        errors << "#{context}: `date` must be ISO format YYYY-MM-DD"
      end
    end

    errors << "#{context}: `label` must be a non-empty string" unless present_string?(item["label"])
    unless item["featured"] == true || item["featured"] == false
      errors << "#{context}: `featured` must be true or false"
    end
    errors << "#{context}: `content_html` must be a non-empty string" unless present_string?(item["content_html"])
  end
end

teaching = load_yaml(File.join(DATA_DIR, "teaching.yml"))
unless teaching.is_a?(Hash)
  errors << "teaching.yml: must be a mapping"
else
  require_keys!(errors, teaching, %w[sections supervision_heading supervision], "teaching.yml")
  reject_unknown_keys!(errors, teaching, %w[sections supervision_heading supervision], "teaching.yml")

  unless teaching["sections"].is_a?(Array) && !teaching["sections"].empty?
    errors << "teaching.yml: `sections` must be a non-empty array"
  else
    teaching["sections"].each_with_index do |section, s_idx|
      context = "teaching.yml section #{s_idx + 1}"
      unless section.is_a?(Hash)
        errors << "#{context}: section must be a mapping"
        next
      end

      require_keys!(errors, section, %w[heading items], context)
      reject_unknown_keys!(errors, section, %w[heading items], context)
      errors << "#{context}: `heading` must be a non-empty string" unless present_string?(section["heading"])

      unless section["items"].is_a?(Array)
        errors << "#{context}: `items` must be an array"
        next
      end

      section["items"].each_with_index do |item, i_idx|
        item_context = "#{context} item #{i_idx + 1}"
        unless item.is_a?(Hash)
          errors << "#{item_context}: item must be a mapping"
          next
        end

        required = %w[title institution venue role years]
        optional = %w[url]
        require_keys!(errors, item, required, item_context)
        reject_unknown_keys!(errors, item, required + optional, item_context)

        errors << "#{item_context}: `title` must be a non-empty string" unless present_string?(item["title"])
        errors << "#{item_context}: `years` must be a non-empty string" unless present_string?(item["years"].to_s)
      end
    end
  end

  errors << "teaching.yml: `supervision_heading` must be a non-empty string" unless present_string?(teaching["supervision_heading"])

  unless teaching["supervision"].is_a?(Array)
    errors << "teaching.yml: `supervision` must be an array"
  else
    teaching["supervision"].each_with_index do |item, idx|
      context = "teaching.yml supervision item #{idx + 1}"
      unless item.is_a?(Hash)
        errors << "#{context}: item must be a mapping"
        next
      end

      required = %w[name years details]
      optional = %w[url]
      require_keys!(errors, item, required, context)
      reject_unknown_keys!(errors, item, required + optional, context)

      errors << "#{context}: `name` must be a non-empty string" unless present_string?(item["name"])
      errors << "#{context}: `years` must be a non-empty string" unless present_string?(item["years"].to_s)
      errors << "#{context}: `details` must be a non-empty string" unless present_string?(item["details"])
    end
  end
end

research = load_yaml(File.join(DATA_DIR, "research.yml"))
unless research.is_a?(Hash)
  errors << "research.yml: must be a mapping"
else
  require_keys!(errors, research, %w[sections], "research.yml")
  reject_unknown_keys!(errors, research, %w[sections], "research.yml")

  unless research["sections"].is_a?(Array) && !research["sections"].empty?
    errors << "research.yml: `sections` must be a non-empty array"
  else
    seen_ids = {}
    research["sections"].each_with_index do |section, s_idx|
      context = "research.yml section #{s_idx + 1}"
      unless section.is_a?(Hash)
        errors << "#{context}: section must be a mapping"
        next
      end

      require_keys!(errors, section, %w[id title papers], context)
      reject_unknown_keys!(errors, section, %w[id title papers], context)

      section_id = section["id"].to_s
      errors << "#{context}: `id` must be a non-empty string" if section_id.strip.empty?
      if seen_ids[section_id]
        errors << "#{context}: duplicate section id `#{section_id}`"
      end
      seen_ids[section_id] = true

      errors << "#{context}: `title` must be a non-empty string" unless present_string?(section["title"])
      unless section["papers"].is_a?(Array)
        errors << "#{context}: `papers` must be an array"
        next
      end

      section["papers"].each_with_index do |paper, p_idx|
        paper_context = "#{context} paper #{p_idx + 1}"
        unless paper.is_a?(Hash)
          errors << "#{paper_context}: paper must be a mapping"
          next
        end

        required = %w[title url venue image image_alt image_side links authors]
        optional = %w[authors_html]
        require_keys!(errors, paper, required, paper_context)
        reject_unknown_keys!(errors, paper, required + optional, paper_context)

        %w[title url venue image image_alt].each do |key|
          next if present_string?(paper[key])
          errors << "#{paper_context}: `#{key}` must be a non-empty string"
        end

        unless %w[left right].include?(paper["image_side"])
          errors << "#{paper_context}: `image_side` must be `left` or `right`"
        end

        unless paper["links"].is_a?(Array) && !paper["links"].empty?
          errors << "#{paper_context}: `links` must be a non-empty array"
        else
          paper["links"].each_with_index do |link, l_idx|
            link_context = "#{paper_context} link #{l_idx + 1}"
            unless link.is_a?(Hash)
              errors << "#{link_context}: link must be a mapping"
              next
            end

            require_keys!(errors, link, %w[label url kind], link_context)
            reject_unknown_keys!(errors, link, %w[label url kind], link_context)

            %w[label url kind].each do |key|
              next if present_string?(link[key])
              errors << "#{link_context}: `#{key}` must be a non-empty string"
            end
          end
        end

        unless paper["authors"].is_a?(Array) && !paper["authors"].empty?
          errors << "#{paper_context}: `authors` must be a non-empty array"
          next
        end

        paper["authors"].each_with_index do |author, a_idx|
          author_context = "#{paper_context} author #{a_idx + 1}"
          unless author.is_a?(Hash)
            errors << "#{author_context}: author must be a mapping"
            next
          end

          allowed = %w[name url me suffix]
          require_keys!(errors, author, %w[name], author_context)
          reject_unknown_keys!(errors, author, allowed, author_context)

          errors << "#{author_context}: `name` must be a non-empty string" unless present_string?(author["name"])
          if author.key?("me") && !(author["me"] == true || author["me"] == false)
            errors << "#{author_context}: `me` must be boolean if provided"
          end
          if author.key?("url") && !author["url"].nil? && !author["url"].is_a?(String)
            errors << "#{author_context}: `url` must be a string when provided"
          end
          if author.key?("suffix") && !author["suffix"].nil? && !author["suffix"].is_a?(String)
            errors << "#{author_context}: `suffix` must be a string when provided"
          end
        end
      end
    end
  end
end

if errors.empty?
  puts "Data validation passed for news.yml, teaching.yml, and research.yml."
  exit 0
end

warn "Data validation failed with #{errors.length} issue(s):"
errors.each { |err| warn "- #{err}" }
exit 1
