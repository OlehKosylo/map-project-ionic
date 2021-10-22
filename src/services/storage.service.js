import {Storage} from '@capacitor/storage';

export class StorageService {
    async setItem(value) {
        await Storage.set({
            key: 'access_key',
            value
        });
    };

    async getItem(key) {
        const {value} = await Storage.get({key});

        return value;
    };

    async removeItem(key) {
        await Storage.remove({key});
    };
}


