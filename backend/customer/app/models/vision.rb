# Google Cloud Platform environments
# When running on Google Cloud Platform (GCP), including Google Compute Engine (GCE), 
# Google Kubernetes Engine (GKE), Google App Engine (GAE), Google Cloud Functions (GCF) and Cloud Run, 
# Credentials are discovered automatically. Code should be written as if already authenticated.

class Vision

    require "google/cloud/storage"
    require "google/cloud/vision/v1"
    require "json"

    def extract_data(image_name)
        path = File.expand_path(File.dirname(__FILE__))

        ### credentials not needed if working on cloud environment
        storage = Google::Cloud::Storage.new(
            project_id: "dbs-backend-1",
            credentials: "#{path}/dbs-backend-1-af6872211c29.json"
        )

        bucket = storage.bucket "dbs-backend-1-ruby"
        file = bucket.file image_name
        
        client = ::Google::Cloud::Vision::V1::ImageAnnotator::Client.new do |config|
            config.credentials = "#{path}/key.json"
        end

        ### END of authenticating to GCP

        text = []
        response = client.text_detection(image: file.signed_url)
        response.responses.each do |res|
            res.text_annotations.each do |annotation|
                text << annotation.description
            end
        end

        #puts text[0]
        # output returns the data extracted from the image in an array
        output = text[0].split("\n")

        nameIndex = output.index{|s| s =~ /Name/}
        passportIndex = output.index{|s| s =~ /DOCUMENT/}
        nationalityIndex = output.index{|s| s =~ /Nationality/}
        genderIndex = output.index{|s| s =~ /Sex/}
        expiryIndex = output.index{|s| s =~ /Date of expiry/}
        birthIndex = output.index{|s| s =~ /Date of birth/}

        output_hash = {}

        # handling full name for australian passport by hardcoding because names is separated by new line
        if nameIndex == nil
            output_hash["fullname"] = ""
        else
            output_hash["fullname"] = output[nameIndex+1] + " " + output[nameIndex+2]
        end

        # updating the hashmap for the remaining fields
        checkIndexArr = [passportIndex, nationalityIndex, genderIndex, expiryIndex, birthIndex]
        output_hash_keys = ["passport_number", "nationality", "gender", "passport_expiry", "dob"]

        checkIndexArr.each_with_index {|item, index|
            if item == nil
                output_hash[output_hash_keys[index]] = ""
            else
                # assuming that the value of the hash keys are always the next item in the array
                output_hash[output_hash_keys[index]] = "#{output[item+1]}"
            end
        }

        # output_hash = {"full_name" => "#{output[nameIndex+1]}" +  " " + "#{output[nameIndex+2]}",
        #             "passport_number" => "#{output[passportIndex+1]}", 
        #             "passport_expiry" => "#{output[expiryIndex+1]}", 
        #             "nationality" => "#{output[nationalityIndex+1]}", 
        #             "gender" => "#{output[genderIndex+1]}",
        #                 "dob" => "#{output[birthIndex+1]}"
        # }

        puts output_hash.to_json
    end
end

# vision = Vision.new
# vision.extract_data("passport.jpg")

