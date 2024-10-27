import React from 'react';
import { useSpring } from 'react-spring';
import { 
  PRIVACY_CONTENT, 
  PRIVACY_SECTIONS, 
  PRIVACY_NOTICE, 
  PRIVACY_AGREEMENTS 
} from '../constants/privacy';
import * as R from '../style';

interface PrivacyStepProps {
  isPrivacyCollectionAgreed: boolean;
  setIsPrivacyCollectionAgreed: (value: boolean) => void;
  isPrivacyThirdPartyAgreed: boolean;
  setIsPrivacyThirdPartyAgreed: (value: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  errors: { [key: string]: string };
}

export const PrivacyStep: React.FC<PrivacyStepProps> = ({
  isPrivacyCollectionAgreed,
  setIsPrivacyCollectionAgreed,
  isPrivacyThirdPartyAgreed,
  setIsPrivacyThirdPartyAgreed,
  onNext,
  onPrev,
  errors,
}) => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

  return (
    <R.AnimatedContainer style={fadeIn}>
      <R.StepTitle>개인정보 수집 및 이용 동의</R.StepTitle>
      <R.PrivacyContent>
        <h3>{PRIVACY_SECTIONS.PROCESSING.title}</h3>
        <table>
          <tr>
            <th>{PRIVACY_SECTIONS.PROCESSING.tableHeaders.category}</th>
            <th>{PRIVACY_SECTIONS.PROCESSING.tableHeaders.purpose}</th>
            <th>{PRIVACY_SECTIONS.PROCESSING.tableHeaders.items}</th>
          </tr>
          <tr>
            <td>필수항목</td>
            <td>
              {PRIVACY_CONTENT.REQUIRED_ITEMS.purposes.map(purpose => (
                <React.Fragment key={purpose}>
                  - {purpose}<br/>
                </React.Fragment>
              ))}
            </td>
            <td>
              {PRIVACY_CONTENT.REQUIRED_ITEMS.items.map(item => (
                <React.Fragment key={item}>
                  - {item}<br/>
                </React.Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <td>본인인증 시</td>
            <td>
              {PRIVACY_CONTENT.VERIFICATION_ITEMS.purposes.map(purpose => (
                <React.Fragment key={purpose}>
                  - {purpose}<br/>
                </React.Fragment>
              ))}
            </td>
            <td>
              {PRIVACY_CONTENT.VERIFICATION_ITEMS.items.map(item => (
                <React.Fragment key={item}>
                  - {item}<br/>
                </React.Fragment>
              ))}
            </td>
          </tr>
        </table>

        <h3>{PRIVACY_SECTIONS.RETENTION.title}</h3>
        <table>
          <tr>
            <th>{PRIVACY_SECTIONS.RETENTION.tableHeaders.period}</th>
            <td>{PRIVACY_CONTENT.RETENTION.period}</td>
          </tr>
          <tr>
            <th>{PRIVACY_SECTIONS.RETENTION.tableHeaders.legal}</th>
            <td>
              {PRIVACY_CONTENT.RETENTION.legal_obligations.map(obligation => (
                <React.Fragment key={obligation}>
                  - {obligation}<br/>
                </React.Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th>{PRIVACY_SECTIONS.RETENTION.tableHeaders.disposal}</th>
            <td>
              {PRIVACY_CONTENT.RETENTION.disposal_methods.map(method => (
                <React.Fragment key={method}>
                  - {method}<br/>
                </React.Fragment>
              ))}
            </td>
          </tr>
        </table>

        <h3>{PRIVACY_SECTIONS.THIRD_PARTY.title}</h3>
        <table>
          <tr>
            <th>{PRIVACY_SECTIONS.THIRD_PARTY.tableHeaders.recipient}</th>
            <td>{PRIVACY_CONTENT.THIRD_PARTY.recipient}</td>
          </tr>
          <tr>
            <th>{PRIVACY_SECTIONS.THIRD_PARTY.tableHeaders.purpose}</th>
            <td>{PRIVACY_CONTENT.THIRD_PARTY.purpose}</td>
          </tr>
          <tr>
            <th>{PRIVACY_SECTIONS.THIRD_PARTY.tableHeaders.items}</th>
            <td>{PRIVACY_CONTENT.THIRD_PARTY.items.join(', ')}</td>
          </tr>
          <tr>
            <th>{PRIVACY_SECTIONS.THIRD_PARTY.tableHeaders.retention}</th>
            <td>{PRIVACY_CONTENT.THIRD_PARTY.retention}</td>
          </tr>
        </table>

        <h3>{PRIVACY_SECTIONS.OUTSOURCING.title}</h3>
        <table>
          <tr>
            <th>{PRIVACY_SECTIONS.OUTSOURCING.tableHeaders.processor}</th>
            <th>{PRIVACY_SECTIONS.OUTSOURCING.tableHeaders.tasks}</th>
          </tr>
          {PRIVACY_CONTENT.PROCESSORS.map(processor => (
            <tr key={processor.name}>
              <td>{processor.name}</td>
              <td>
                {processor.tasks.map(task => (
                  <React.Fragment key={task}>
                    - {task}<br/>
                  </React.Fragment>
                ))}
              </td>
            </tr>
          ))}
        </table>

        <h3>{PRIVACY_SECTIONS.RIGHTS.title}</h3>
        <p>
          {PRIVACY_SECTIONS.RIGHTS.description}<br/>
          {PRIVACY_CONTENT.USER_RIGHTS.map(right => (
            <React.Fragment key={right}>
              - {right}<br/>
            </React.Fragment>
          ))}
        </p>

        <h3>{PRIVACY_SECTIONS.SECURITY.title}</h3>
        <p>
          {PRIVACY_SECTIONS.SECURITY.description}<br/>
          {PRIVACY_CONTENT.SECURITY_MEASURES.map(measure => (
            <React.Fragment key={measure}>
              - {measure}<br/>
            </React.Fragment>
          ))}
        </p>

        <h3>{PRIVACY_SECTIONS.OFFICER.title}</h3>
        <table>
          <tr>
            <th>{PRIVACY_CONTENT.PRIVACY_OFFICER.title}</th>
            <td>{PRIVACY_CONTENT.PRIVACY_OFFICER.name}</td>
          </tr>
          <tr>
            <th>{PRIVACY_SECTIONS.OFFICER.tableHeaders.contact}</th>
            <td>{PRIVACY_CONTENT.PRIVACY_OFFICER.contact}</td>
          </tr>
        </table>
      </R.PrivacyContent>

      <R.PrivacyNotice>
        <p>{PRIVACY_NOTICE.rights}</p>
        <p>{PRIVACY_NOTICE.consequences}</p>
      </R.PrivacyNotice>

      <R.PrivacyAgreementContainer>
        <R.PrivacyCheckboxWrapper>
          <R.PrivacyCheckbox
            type="checkbox"
            id={PRIVACY_AGREEMENTS.collection.id}
            checked={isPrivacyCollectionAgreed}
            onChange={() => setIsPrivacyCollectionAgreed(!isPrivacyCollectionAgreed)}
          />
          <R.PrivacyLabel htmlFor={PRIVACY_AGREEMENTS.collection.id}>
            {PRIVACY_AGREEMENTS.collection.label}
          </R.PrivacyLabel>
        </R.PrivacyCheckboxWrapper>
        
        <R.PrivacyCheckboxWrapper>
          <R.PrivacyCheckbox
            type="checkbox"
            id={PRIVACY_AGREEMENTS.thirdParty.id}
            checked={isPrivacyThirdPartyAgreed}
            onChange={() => setIsPrivacyThirdPartyAgreed(!isPrivacyThirdPartyAgreed)}
          />
          <R.PrivacyLabel htmlFor={PRIVACY_AGREEMENTS.thirdParty.id}>
            {PRIVACY_AGREEMENTS.thirdParty.label}
          </R.PrivacyLabel>
        </R.PrivacyCheckboxWrapper>
      </R.PrivacyAgreementContainer>

      {errors.privacyAgreement && 
        <R.ErrorMessage isVisible={true}>{errors.privacyAgreement}</R.ErrorMessage>
      }

      <R.ButtonContainer>
        <R.NavigationButton onClick={onPrev} isPrev>
          이전
        </R.NavigationButton>
        <R.NavigationButton 
          onClick={onNext}
          disabled={!isPrivacyCollectionAgreed || !isPrivacyThirdPartyAgreed}
        >
          다음
        </R.NavigationButton>
      </R.ButtonContainer>
    </R.AnimatedContainer>
  );
};
