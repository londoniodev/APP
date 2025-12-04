import { Module, Global } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';

/**
 * Storage module providing file storage capabilities.
 * 
 * @remarks
 * Currently uses LocalStorageService. To switch to S3:
 * 1. Create S3StorageService implementing IStorageService
 * 2. Update the provider based on environment variable
 * 
 * @example
 * ```typescript
 * // In any module
 * constructor(@Inject('IStorageService') private storage: IStorageService) {}
 * ```
 */
@Global()
@Module({
    providers: [
        {
            provide: 'IStorageService',
            useClass: LocalStorageService,
            // Future: Use factory to switch based on env
            // useFactory: () => {
            //   return process.env.STORAGE_TYPE === 's3'
            //     ? new S3StorageService()
            //     : new LocalStorageService();
            // }
        },
    ],
    exports: ['IStorageService'],
})
export class StorageModule { }
