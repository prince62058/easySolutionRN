import {logo} from './fileBase64';

const toDataURL = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );

// image = 'data:image/jpeg;base64,aHR0cHM6Ly9zYXR5YWthYmlyLWJ1Y2tldC5zZ3AxLmRpZ2l0YWxvY2VhbnNwYWNlcy5jb20vSG9tZVNlcnZpY2UvMTY5MTE0MTAxNzE1MXN0aWxsLWxpZmUtcGVyZmVjdGx5LW9yZGVyZWQtZml0bmVzcy1neW0tYWNjZXNzb3JpZXNfNTI2ODMtMTAwNjk3LmF2aWY='

export const convertImageToBase64Png = async url => {
  // getImg64()
  // url = 'https://satyakabir-bucket.sgp1.digitaloceanspaces.com/HomeService/1691141017151still-life-perfectly-ordered-fitness-gym-accessories_52683-100697.avif'
  let image = '';
  toDataURL(url)
    .then(dataUrl => {
      image = 'data:image/jpeg;' + String(dataUrl)?.split(';')?.[1];
      console.log(
        'RESULT:',
        'data:image/jpeg;' + String(dataUrl)?.split(';')?.[1],
      );
      // return 'data:image/jpeg;' + String(dataUrl)?.split(";")?.[1]
    })
    .catch(err => console.log('base64 err : ', err));
  return image;
};

const getImg64 = async () => {
  const convertImgToBase64URL = url => {
    console.log(url);
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let canvas = document.createElement('CANVAS');
        const ctx = canvas.getContext('2d');
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL();
        canvas = null;
        resolve(dataURL);
      };
      img.src = url;
    });
  };
  //for the demonstration purposes I used proxy server to avoid cross origin error
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  // const image = await convertImgToBase64URL(proxyUrl+'https://image.shutterstock.com/image-vector/vector-line-icon-hello-wave-260nw-1521867944.jpg')
  const image = await convertImgToBase64URL(
    'https://satyakabir-bucket.sgp1.digitaloceanspaces.com/HomeService/1691141017151still-life-perfectly-ordered-fitness-gym-accessories_52683-100697.avif',
  );

  console.log('image : ', image);
};
// getImg64()
