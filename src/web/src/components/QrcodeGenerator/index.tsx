import QrCode from 'react-qr-code';

const QrcodeGenerator = ({ size = 300, value }: {size: number, value: string}) => {
    return <QrCode size={size} value={value} />;
};

export default QrcodeGenerator;
