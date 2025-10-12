export const handleEncodeData = (data: any): string => {
    return Buffer.from(JSON.stringify(data)).toString('base64')
}

export const handleDecodeData = (data: string): any => {
    return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'))
}