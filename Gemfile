source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
#

# Minimal mistakes theme
gem "minimal-mistakes-jekyll"
gem 'jekyll-remote-theme'
gem 'octopress', '~> 3.0'

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

# To upgrade, run `bundle update github-pages`.
gem "github-pages", group: :jekyll_plugins

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem 'jekyll-archives'
  gem "jekyll-paginate"
  gem "jekyll-include-cache"
end

gem "webrick", "~> 1.7"
