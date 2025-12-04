export class SaveModuleConfigDto {
    moduleId: string;
    config: Record<string, any>;
    enabled?: boolean;
}
