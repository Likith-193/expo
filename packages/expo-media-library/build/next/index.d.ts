import ExpoMediaLibraryNext from './ExpoMediaLibraryNext';
import { PermissionResponse } from 'expo-modules-core';
export declare class Asset extends ExpoMediaLibraryNext.Asset {
    static create(filePath: string, album?: Album): Promise<Asset>;
    static deleteMany(assets: Array<Asset>): Promise<void>;
}
export declare class Album extends ExpoMediaLibraryNext.Album {
    static create(name: string, assetsRefs: string[] | Asset[], moveAssets?: boolean): Promise<Album>;
    static deleteMany(albums: Array<Album>, deleteAssets?: Boolean): Promise<void>;
    static getAll(): Promise<Array<Album>>;
}
export type GranularPermission = 'audio' | 'photo' | 'video';
export declare function requestPermissionsAsync(writeOnly?: boolean, granularPermissions?: GranularPermission[]): Promise<PermissionResponse>;
//# sourceMappingURL=index.d.ts.map