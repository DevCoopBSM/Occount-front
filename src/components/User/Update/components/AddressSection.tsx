import React from 'react';
import * as S from '../style';

interface AddressSectionProps {
    address: string;
    addressDetail: string;
    isAddressSearched: boolean;
    isScriptLoaded: boolean;
    openAddressSearch: () => void;
    handleAddressDetailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
    address,
    addressDetail,
    isAddressSearched,
    isScriptLoaded,
    openAddressSearch,
    handleAddressDetailChange
}) => {
    return (
        <>
            <S.InputContainer>
                <S.InputLabel>주소</S.InputLabel>
                <S.AddressInputContainer>
                    <S.AddressInput
                        type="text"
                        value={address}
                        placeholder="주소를 검색해주세요"
                        readOnly
                        required
                    />
                    <S.AddressSearchButton 
                        type="button" 
                        onClick={openAddressSearch}
                        disabled={!isScriptLoaded}
                    >
                        주소 검색
                    </S.AddressSearchButton>
                </S.AddressInputContainer>
            </S.InputContainer>
            
            {isAddressSearched && (
                <S.InputContainer>
                    <S.InputLabel>상세 주소</S.InputLabel>
                    <S.RegisterInput
                        type="text"
                        value={addressDetail}
                        onChange={handleAddressDetailChange}
                        placeholder="상세 주소를 입력해주세요"
                    />
                </S.InputContainer>
            )}
        </>
    );
};