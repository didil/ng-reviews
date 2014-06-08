source 'https://rubygems.org'
ruby '2.1.2'
gem 'rails', '4.1.1'
gem 'sdoc', '~> 0.4.0',          group: :doc
gem 'spring',        group: :development
gem 'devise'
gem 'pg'
gem 'active_model_serializers', '~> 0.8.1'
gem 'cancancan', '~> 1.8.1'
gem 'rolify' , '~> 3.2.0'
gem 'newrelic_rpm'

group :development do
  gem 'better_errors'
  gem 'binding_of_caller', :platforms=>[:mri_21]
  gem 'quiet_assets'
  gem 'annotate', '~> 2.6.3'
end
group :development, :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem "spring-commands-rspec"
end
group :production do
  gem 'unicorn'
  gem 'rails_12factor'
end
group :test do
  gem 'database_cleaner'
  gem 'faker'
  gem 'launchy'
end
