// Interface for call data class
declare module 'ConfigData' {
    interface ConfigData {
        getComment: () => string;
    }
    // interface for define algoritem in csr
    interface CSRKey {
        algo: string,
        size: number
    }
    // interface for details to csr
    interface CSRNames {
        C: string;
        ST: string;
        L: string;
        O: string;
        OU: string;
    }
    // ca details for old and ica
    interface CSRCa {
        expiry: string,
        pathlength: number
    }
    interface Polices {
        Readers: PolicesData,
        Writers: PolicesData,
        Admins: PolicesData,
        LifecycleEndorsement?: PolicesData,
        BlockValidation?: PolicesData,
        Endorsement: PolicesData
    }
    interface PolicesData {
        Type: string,
        Rule: string
    }
    interface OrganizationData {
        Name: string,
        SkipAsForeign?: boolean,
        ID: string,
        MSPDir: string,
        Polices?: Polices,
        OrdererEndpoints?: string[],
        AnchorPees?: AnchorPees[]
    }
    interface AnchorPees {
        Host: string,
        Port: number
        
    }
    interface CapabilitiesData {
        [key: string]: boolean
    }
    interface Consrtiums {

        [key: string]: {
            Organizations: []
        }
    }
}
