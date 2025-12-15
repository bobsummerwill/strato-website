# Category Pages Generator Plugin
# 
# This plugin automatically generates category pages for blog posts during the Jekyll build.
# For each unique category found in blog posts, it creates a page at /blog/category/[category-slug]/
#
# Example: If blog posts have categories ["General", "Press Release"], it generates:
# - /blog/category/general/
# - /blog/category/press-release/

module Jekyll
  class CategoryPageGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Only proceed if we have blog posts
      unless site.collections.key?('blog')
        puts "CategoryPageGenerator: No 'blog' collection found"
        return
      end
      
      blog_posts = site.collections['blog'].docs
      puts "CategoryPageGenerator: Found #{blog_posts.size} blog posts"
      
      # Collect all unique categories from all blog posts
      categories = Set.new
      blog_posts.each do |post|
        if post.data['categories']
          # Handle both array and string categories
          cats = post.data['categories']
          cats = [cats] unless cats.is_a?(Array)
          cats.each { |cat| categories.add(cat.to_s.strip) if cat }
        end
      end
      
      puts "CategoryPageGenerator: Found #{categories.size} unique categories: #{categories.to_a.join(', ')}"
      
      # Generate a page for each category
      categories.each do |category|
        puts "CategoryPageGenerator: Creating page for category '#{category}'"
        site.pages << CategoryPage.new(site, site.source, category)
      end
      
      puts "CategoryPageGenerator: Generated #{categories.size} category pages"
      
      # Generate archive pages by month/year
      archives = Hash.new(0)
      blog_posts.each do |post|
        if post.data['date']
          date = post.data['date']
          year_month = date.strftime('%Y-%m')
          archives[year_month] += 1
        end
      end
      
      puts "CategoryPageGenerator: Found #{archives.size} archive periods"
      
      archives.each do |year_month, count|
        year, month = year_month.split('-')
        site.pages << ArchivePage.new(site, site.source, year, month)
        puts "CategoryPageGenerator: Creating archive page for #{year_month}"
      end
      
      puts "CategoryPageGenerator: Generated #{archives.size} archive pages"

      # Generate archive pages for videos by month/year
      unless site.collections.key?('videos')
        puts "CategoryPageGenerator: No 'videos' collection found"
        return
      end

      video_posts = site.collections['videos'].docs
      puts "CategoryPageGenerator: Found #{video_posts.size} videos"

      video_archives = Hash.new(0)
      video_posts.each do |video|
        if video.data['date']
          date = video.data['date']
          year_month = date.strftime('%Y-%m')
          video_archives[year_month] += 1
        end
      end

      puts "CategoryPageGenerator: Found #{video_archives.size} video archive periods"

      video_archives.each do |year_month, count|
        year, month = year_month.split('-')
        site.pages << VideoArchivePage.new(site, site.source, year, month)
        puts "CategoryPageGenerator: Creating video archive page for #{year_month}"
      end

      puts "CategoryPageGenerator: Generated #{video_archives.size} video archive pages"
    end
  end

  class ArchivePage < Page
    def initialize(site, base, year, month)
      @site = site
      @base = base
      
      # Set the directory and filename for this archive page
      @dir = File.join('blog', 'archive', year, month)
      @name = 'index.html'
      
      # Initialize the page
      self.process(@name)
      
      # Create readable month name
      month_names = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December']
      month_name = month_names[month.to_i]
      
      # Set page data
      self.data = {
        'layout' => 'archive',
        'title' => "#{month_name} #{year}",
        'year' => year,
        'month' => month,
        'month_name' => month_name,
        'is_archive_page' => true
      }
      
      # Set empty content (layout will handle it)
      self.content = ''
    end
  end

  class CategoryPage < Page
    def initialize(site, base, category)
      @site = site
      @base = base

      # Create URL-friendly slug from category name (match Liquid's `slugify`)
      category_slug = Jekyll::Utils.slugify(category.to_s, mode: 'default')

      # Set the directory and filename for this category page
      @dir = File.join('blog', 'category', category_slug)
      @name = 'index.html'

      # Initialize the page
      self.process(@name)

      # Set page data first
      self.data = {
        'layout' => 'category',
        'title' => category,
        'category' => category,
        'category_slug' => category_slug,
        'is_category_page' => true
      }

      # Set empty content (layout will handle it)
      self.content = ''
    end
  end

  class VideoArchivePage < Page
    def initialize(site, base, year, month)
      @site = site
      @base = base

      # Set the directory and filename for this video archive page
      @dir = File.join('videos', 'archive', year, month)
      @name = 'index.html'

      # Initialize the page
      self.process(@name)

      # Create readable month name
      month_names = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December']
      month_name = month_names[month.to_i]

      # Set page data
      self.data = {
        'layout' => 'video-archive',
        'title' => "#{month_name} #{year}",
        'year' => year,
        'month' => month,
        'month_name' => month_name,
        'is_video_archive_page' => true
      }

      # Set empty content (layout will handle it)
      self.content = ''
    end
  end
end
