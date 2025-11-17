import useSleekStore from '@/store/Store';
import { useState } from 'react';
import { FaMobileAlt, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Simulate API calls
const simulateSendOtp = async (phoneNumber: string) => {
  console.log(`Simulating sending OTP to: ${phoneNumber}`);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'OTP sent successfully!' };
};

const simulateVerifyOtp = async (phoneNumber: string, otp: string, updateLoggedInUser: (user:any)=> void) => {
  console.log(`Simulating verifying OTP: ${otp} for ${phoneNumber}`);
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate successful verification
  if (otp === '123456') {
    const mockToken = 'mock_jwt_token_12345';
    localStorage.setItem('auth_token', mockToken); 
    updateLoggedInUser({auth_token: mockToken})
    return { success: true, token: mockToken };
  } else {
    return { success: false, message: 'Invalid OTP. (Try 123456)' };
  }
};

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const updateLoggedInUser = useSleekStore((state)=> state.updateLoggedInUser);

  const handleSendOtp = async (e:any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simple validation
    if (phoneNumber.length < 10 || isNaN(Number(phoneNumber))) {
      setError('Please enter a valid 10-digit mobile number.');
      setLoading(false);
      return;
    }

    try {
      const result = await simulateSendOtp(phoneNumber);
      if (result.success) {
        setIsOtpSent(true);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e:any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (otp.length !== 6) {
      setError('OTP must be 6 digits.');
      setLoading(false);
      return;
    }

    try {
      const result = await simulateVerifyOtp(phoneNumber, otp, updateLoggedInUser);
      if (result.success) {
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate('/')
        }, 1000);
      } else {
        setError(result.message || 'Verification failed.');
      }
    } catch (err) {
      setError('An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "appearance-none relative block w-full px-3 py-3 border-2 border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-lg transition duration-150 ease-in-out pl-12";
  const buttonClass = "mt-6 w-full flex justify-center py-3 px-4 border-2 border-transparent rounded-lg shadow-lg text-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out";

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl text-center border-4 border-black">
          <div className="mb-6">
            <div className="w-20 h-20 bg-black rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">Welcome!</h2>
            <p className="text-gray-600">You have successfully logged in.</p>
          </div>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setIsOtpSent(false);
              setPhoneNumber('');
              setOtp('');
              localStorage.removeItem('auth_token');
            }}
            className="px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl space-y-8 transform hover:scale-[1.01] transition duration-300 ease-in-out border-t-4 border-black">
        
        <div className="flex flex-col items-center">
          <FaSignInAlt className="text-5xl text-black mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight">
            {isOtpSent ? 'Verify OTP' : 'Sign In with Mobile'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            {isOtpSent ? 'Enter the code sent to your phone.' : 'Secure, passwordless login.'}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm font-medium text-red-800 bg-red-50 rounded-lg border-2 border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
          {!isOtpSent ? (
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaMobileAlt className="text-black" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={inputClass}
                  placeholder="e.g., 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className={`${buttonClass} bg-black hover:bg-gray-800`}
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Get OTP'}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-center text-gray-600 mb-4">
                OTP sent to <span className="font-semibold text-black">{phoneNumber}</span>
              </p>
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                One-Time Password (OTP)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-black" />
                </div>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  className={`${inputClass} text-2xl tracking-widest text-center`}
                  placeholder="------"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className={`${buttonClass} bg-black hover:bg-gray-800`}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Submit OTP & Login'}
              </button>
              
              <div className="flex justify-between items-center mt-3">
                <button
                  type="button"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setIsOtpSent(false)}
                  disabled={loading}
                >
                  &larr; Change Number
                </button>
                <button
                  type="button"
                  className="text-sm font-medium text-black hover:text-gray-700 transition"
                  onClick={() => alert('Resending OTP...')}
                  disabled={loading}
                >
                  Resend Code
                </button>
              </div>
            </div>
          )}
        </form>
        
        <div className="text-center pt-4 border-t border-gray-200 mt-8">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#signup" className="font-semibold text-black hover:text-gray-700 transition duration-150">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;