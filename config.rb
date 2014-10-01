require 'compass'
require 'sass-css-importer'

#compass settings
project_type = :stand_alone
output_style = :compressed
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
sourcemap = true

add_import_path Sass::CssImporter::Importer.new("vendor")
