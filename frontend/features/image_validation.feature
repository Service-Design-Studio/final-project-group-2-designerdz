# Feature: Image Validation
#     As a user uploading images
#     I want to know that I have uploaded the correct image
#     So that I am able to fill up the form properly

#     Scenario: 
#         Given I am on the passport page
#         When I upload a bad <image>
#         Then I should observe <error>

#     Examples:
#         | image                 |      error                                   |
#         | "blurry_passport.jpg" | "Image is blurry, please upload a new image" |
#         | "not_passport.png"    | "This is not a valid passport image"         |
#         | "not_found.png"       | "Image not found"                            |
#         | "invalid_file.csv"    | "Only PNG or JPEG is accepted"               | 