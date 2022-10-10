import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/uploads/${req.dirName}/`)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()
        const filename = file.originalname  // name.jpg
        const part = filename.split(".")
        part[part.length - 2] += uniqueSuffix   // name+uniqeSuffix.jpg
        cb(null, part.join("."))
    }
})
export const upload = multer({ storage })

const storageResources = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/${req.dirName}/`)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()
        const filename = file.originalname  // name.jpg
        const part = filename.split(".")
        part[part.length - 2] += uniqueSuffix   // name+uniqeSuffix.jpg
        cb(null, part.join("."))
    }
})
export const uploadResources = multer({ storage: storageResources })

export const handleFilePath = req_file => {
    if (process.platform === 'win32')
        return req_file ? req_file.path.split("\\").slice(1).join("/") : null
    else
        return req_file ? req_file.path.split("/").slice(1).join("/") : null
}

export const OTP_EXPIRED = 60000 // unit: milisecond

export const JWT_EXPIRED = '7d'
export const JWT_REFRESH_EXPIRED = '30d'

export const SESSION_AGE = 600000 // unit: milisecond

export const UTYPE = {
    STAFF: 'staff',
    CUSTOMER: 'customer'
}

export const STAFF = {
    ADMIN: 'admin',
    DRIVER: 'driver',
    SHIPPER: 'shipper',
    STOREKEEPER: 'storekeeper',
    STAFF: 'staff'
}

export const CUSTOMER = {
    BUSINESS: 'business',
    PASSERS: 'passers',
    INTERMEDIARY: 'intermediary'
}

export const CUSTOMER_RANK = {
    TITAN: 'titan',
    GOLD: 'gold',
    SILVER: 'silver',
    BRONZE: 'bronze',
    UNRANK: 'unrank'
}

export const PRODUCT_UNIT = {
    KG: 'kg',
    TON: 'ton',
    M3: 'm3'
}

export const RETURN_ZONE = {
    A: 'A', // 'provincial'
    B: 'B', // '<100Km'
    C: 'C', // '100-300Km'
    F: 'F' // '>300Km'
}

export const VERIFY_OP = {
    email: 'email',
    phone: 'phone'
}

export const ORDER_STATUS = {
    waiting: 'waiting',
    accepted: 'accepted',
    probablyProceed: 'probably proceed',
    processing: 'processing',
    completed: 'completed',
    refused: 'refused',
    cancel: 'cancel'
}


export const MAX_LENGTH =    5000 // maximum allowed number of characters


export const MIN_LENGTH =  1 // minimum allowed number of characters

export const APPLICANT_STATUS = {
    APPROVED: 'approved',
    PENDING: 'pending',
    REJECTED: 'rejected',
}

export const INTEREST_SOURCE = {
    REC_STAFF: 'staff',
    REC_STAFF: 'friend',
    REC_EMAIL: 'email',
    REC_PHONE: 'phone',
    REC_FB: 'facebook',
    REC_LKD: 'linkedin',
    REC_INT: 'search',
    REC_EVENT: 'event',
    REC_OTHER: 'other',
}

export const MESSAGE_STATUS = {
    unseen: 'unseen',
    seen: 'seen',
}
export const BILL_STATUS = {
    waiting: 'waiting',
    processing: 'processing',
    completed: 'completed'
}

export const CAR_TYPE = {
    TON_8: '8_ton',
    TON_20: '20_ton',
}

export const NOTIFY_EVENT = {
    connection: 'connection',
    addSession: 'add-session',
    send: 'send',
    receive: 'receive',
    disconnect: 'disconnect'
}

// This constant may be updated late
export const TURNOVER = {
    complete_order: 'complete order',
    fuel: 'fuel',
    repair: 'repair',
    maintenance: 'maintenance',
    incurred: 'incurred'
}

export const SHIPMENT_MANAGER = {
    import: 'import',
    export: 'export'
}

export const PAYMENT_METHOD = {
    CASH: 'cash',
    MOMO_WALLET: 'momo wallet',
    ZALO_PAY: 'zalo pay',
    PAYPAL: 'paypal',
    BANKING: 'banking'
}