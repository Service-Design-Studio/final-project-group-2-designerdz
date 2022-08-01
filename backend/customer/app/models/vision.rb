# Google Cloud Platform environments
# When running on Google Cloud Platform (GCP), including Google Compute Engine (GCE), 
# Google Kubernetes Engine (GKE), Google App Engine (GAE), Google Cloud Functions (GCF) and Cloud Run, 
# Credentials are discovered automatically. Code should be written as if already authenticated.

class Vision

    require "google/cloud/storage"
    require "google/cloud/vision/v1"
    require "json"
    require "mrz"

    def extract_data(image_name)
        path = File.expand_path(File.dirname(__FILE__))
        puts path

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
        response = client.text_detection(image: 'https://storage.googleapis.com/dbs-backend-1-ruby/' + image_name)
    
      
        response.responses.each do |res|
            res.text_annotations.each do |annotation|
                text << annotation.description
            end
        end

        #puts text[0]
        # output returns the data extracted from the image in an array
        output = text[0].split("\n")
        # puts output

        nameIndex = output.index{|s| s =~ /Name/}
        passportIndex = output.index{|s| s =~ /DOCUMENT/}
        nationalityIndex = output.index{|s| s =~ /Nationality/}
        genderIndex = output.index{|s| s =~ /Sex/}
        expiryIndex = output.index{|s| s =~ /Date of expiry/}
        birthIndex = output.index{|s| s =~ /Date of birth/}
        mrzIndex = output.index{|s| s =~ /<</}

        output_hash = {}

        # handling full name for australian passport by hardcoding because names is separated by new line
        # if nameIndex == nil
        #     output_hash["full_name"] = ""
        # else
        #     output_hash["full_name"] = output[nameIndex+1] + " " + output[nameIndex+2]
        # end

        # # updating the hashmap for the remaining fields
        # checkIndexArr = [passportIndex, nationalityIndex, genderIndex, expiryIndex, birthIndex]
        # output_hash_keys = ["passport_number", "nationality", "gender", "passport_expiry", "dob"]


        # checkIndexArr.each_with_index {|item, index|
        #     if item == nil
        #         output_hash[output_hash_keys[index]] = ""
        #     else
        #         # assuming that the value of the hash keys are always the next item in the array
        #         # ensure that item is not nil before changing value
        #         if (item == expiryIndex)
        #             # output[item+1] = change_expiry(output[item+1])
        #             # puts output[item+1]

        #         elsif (item == birthIndex)
        #             # output[item+1] = change_dob(output[item+1])
        #             # puts output[item+1]

        #         end
        #         output_hash[output_hash_keys[index]] = "#{output[item+1]}"
        #     end
        # }
   
        puts output[mrzIndex]  
        puts output[mrzIndex+1]

        mrzarr = [
            "#{output[mrzIndex]}",
            "#{output[mrzIndex+1]}"
        ]
        
        result = MRZ.parse(mrzarr)


        output_hash = {"full_name" => "#{result.last_name}" +  " " + "#{result.first_name}",
                    "passport_number" => "#{result.document_number}", 
                    "passport_expiry" => "#{result.expiration_date}", 
                    "nationality" => "#{result.nationality}", 
                    "gender" => "#{result.sex}",
                        "dob" => "#{result.birth_date}"
        }

        #puts result.valid?
        puts output_hash
        return output_hash.to_json
    end

    # def change_expiry arg
    #     month_hash = {"JAN" => "01", "FEB" => "02", "MAR" => "03", "APR" => "04", 
    #     "MAY" => "05", "JUN" => "06", "JUL" => "07", "AUG" => "08", "SEP" => "09", 
    #     "OCT" => "10", "NOV" => "11", "DEC" => "12"}

    #     temp = arg.split(" ")
    #     temp[1] = month_hash[temp[1]]
    #     return (temp[1] + "/" + temp[2])

    # end

    # def change_dob arg
    #     month_hash = {"JAN" => "01", "FEB" => "02", "MAR" => "03", "APR" => "04", 
    #     "MAY" => "05", "JUN" => "06", "JUL" => "07", "AUG" => "08", "SEP" => "09", 
    #     "OCT" => "10", "NOV" => "11", "DEC" => "12"}

    #     temp = arg.split(" ")
    #     temp[1] = month_hash[temp[1]]
    #     return (temp[0] + "/" + temp[1] + "/" + temp[2])


    # end
end

vision = Vision.new
vision.extract_data("australian_ps.jpg")

