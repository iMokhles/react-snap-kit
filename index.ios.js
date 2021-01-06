import { NativeModules, NativeEventEmitter } from 'react-native';

export const RNSnapchatKit = NativeModules.SnapchatKit;
export const RNSnapchatKitEmitter = new NativeEventEmitter(RNSnapchatKit);

export default class SnapchatKit {
  static login() {
    return new Promise((resolve, reject) => {
      RNSnapchatKit.login()
        .then((result) => {
          if(result.error) {
            reject(result.error);
          } else {
            this.getUserInfo()
              .then(resolve)
              .catch(reject);
          }
        })
        .catch(e => reject(e));
    });
  }

  static async isLogged() {
    const { result } = await RNSnapchatKit.isUserLoggedIn();
    return result;
  }

  static async logout() {
    const { result } = await RNSnapchatKit.logout();
    return result;
  }

  static getUserInfo() {
    return new Promise((resolve, reject) => {
      RNSnapchatKit.fetchUserData()
        .then(async (tmp) => {
          const data = tmp;
          if (data === null) {
            resolve(null);
          } else {
            const res = await RNSnapchatKit.getAccessToken();
            data.accessToken = res.accessToken;
            resolve(data);
          }
        })
        .catch(e => { reject(e) });
    });
  }

  static async sharePhoto(photoImageSourceOrUrl, stickerImageSourceOrUrl, stickerPosX, stickerPosY, attachmentUrl, caption) {

	const { result } = await RNSnapchatKit.sharePhotoResolved(
        photoImageSourceOrUrl,
        stickerImageSourceOrUrl,
		stickerPosX, stickerPosY,
		attachmentUrl,
		caption).catch(e => { reject(e) });

    return result;
  }


  static async shareVideoAtUrl(videoUrl, stickerImageSourceOrUrl, stickerPosX, stickerPosY, attachmentUrl, caption) {

	const { result } = await RNSnapchatKit.shareVideoAtUrl(
		videoUrl,
        stickerImageSourceOrUrl,
		stickerPosX, stickerPosY,
		attachmentUrl,
		caption).catch(e => { reject(e) });

    return result;
  }

}
