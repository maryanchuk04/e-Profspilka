import QrCode from 'react-qr-code';

const QrcodeGenerator = ({ size = 300, value }) => {
    return <QrCode size={size} value={value} />;
};

export default QrcodeGenerator;
