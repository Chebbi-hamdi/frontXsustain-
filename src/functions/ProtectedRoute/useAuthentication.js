import { useEffect, useState } from 'react';
import { VerifyTokena } from '../../api/user'; // Ensure this import is correct

const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const response = await VerifyTokena();
        setAuthenticated(response.success);
      } catch (error) {
        console.error('Error verifying token:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuthentication();
  }, []);

  return { authenticated, loading };
};

export default useAuthentication;