import client from '@/helpers/sanity/client';

const fetchArrayOfImages = async (galleryName: string, setImagesArray: any) => {
  const data = await client.fetch<any>(`*[name == "${galleryName}"]`);

  const res = data[0].imagesGallery.map((item: any) => {
    if (!item) return {};

    const dataWithoutImage = item.asset?._ref.replace('image-', '');
    const result = dataWithoutImage.replace('-jpg', '.jpg');
    return result;
  });
  setImagesArray(res);
};
export default fetchArrayOfImages;
