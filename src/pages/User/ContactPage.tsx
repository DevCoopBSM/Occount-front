import React from 'react';
import { useNavigate } from 'react-router-dom';
import InquiryModal from 'components/User/UserMain/InquiryModal';
import { useAuth } from 'contexts/authContext';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClose = () => {
    navigate('/');
  };

  return <InquiryModal isOpen={true} onRequestClose={handleClose} user={user} />;
};

export default ContactPage;
