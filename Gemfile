source 'https://rubygems.org'
ruby '2.1.2'
gem 'rails', '4.1.1'
gem 'sdoc', '~> 0.4.0',          group: :doc
gem 'spring',        group: :development
gem 'devise'
gem 'pg'
gem 'active_model_serializers', '~> 0.8.1'

group :development do
  gem 'better_errors'
  gem 'binding_of_caller', :platforms=>[:mri_21]
  gem 'quiet_assets'
  gem "spring-commands-rspec"
end
group :development, :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
end
group :production do
  gem 'unicorn'
end
group :test do
  gem 'database_cleaner'
  gem 'faker'
  gem 'launchy'
end
