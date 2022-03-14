import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: 'dnfxrq7mm',
    api_key: '554796393827235',
    api_secret: 'gUJrgux5wVrDq3LqZZVp0DMtrHs',
    secure: true
})

export default cloudinary.v2.uploader