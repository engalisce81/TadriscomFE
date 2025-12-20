import type { EntityDto } from '@abp/ng.core';

export interface AdvertisementDto extends EntityDto<string> {
  title?: string;
  imageUrl?: string;
  targetUrl?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}
