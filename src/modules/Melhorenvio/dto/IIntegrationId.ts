export interface IIntegrationId {
    integration_id: string;
}

export interface ISaveTrackingInformation {
    paymentId?: string;
    amount?: number;
    tracking_code?: string;
    dimensions?: string;
    weight?: number;
    date_updated?: Date;
}
