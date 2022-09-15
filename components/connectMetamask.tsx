import { useMetamask } from '@thirdweb-dev/react';
import { Button } from '@chakra-ui/react';
import { IoMdWallet } from 'react-icons/io';

const ConnectMetamask = () => {
  const connectMetamask = useMetamask();

  return (
    <>
      <Button onClick={connectMetamask} leftIcon={<IoMdWallet />}>
        Connect MetaMask
      </Button>
    </>
  );
};

export default ConnectMetamask;
