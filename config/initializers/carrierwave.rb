CarrierWave.configure do |config|
  config.fog_credentials = {
  	region: 'eu-central-1',
    provider: 'AWS',                       
    aws_access_key_id: 'AKIAINARNMKMEDINRPBA',                       
    aws_secret_access_key: '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'          
  }
  config.fog_directory  = 'vidyaev'                          
end

