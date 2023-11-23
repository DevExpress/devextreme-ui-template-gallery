import './user-profile.scss';
import React, { useState, useCallback, useEffect } from 'react';

import notify from 'devextreme/ui/notify';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import ScrollView from 'devextreme-react/scroll-view';
import { service } from '../../data/user-profile-service';
import { FormPhoto } from '../../components';
import { ProfileCard, ProfileCardItem } from '../../components/library/profile-card/ProfileCard';
import { withLoadPanel } from '../../utils/withLoadPanel';
import { useScreenSize } from '../../utils/media-query';
import { ChangeProfilePasswordForm } from '../../components/library/change-profile-password-form/ChangeProfilePasswordForm';

import { getSupervisors, getProfile } from 'dx-template-gallery-data';

const PROFILE_ID = 22;

const copyToClipboard = (text) => (evt) => {
  window.navigator.clipboard?.writeText(text);
  const tipText = 'Text copied';
  notify(
    {
      message: tipText,
      minWidth: `${tipText.length + 2}ch`,
      width: 'auto',
      position: { of: evt.element, offset: '0 -30' }
    },
    'info',
    500
  );
};

const formatPhone = (value) => {
  return String(value).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');
};

type UserProfileContentProps = {
  basicInfoItems: ProfileCardItem[];
  contactItems: ProfileCardItem[];
  addressItems: ProfileCardItem[];
  profileData: Record<string, string>;
  handleDataChanged: () => void;
  handleChangePasswordClick: () => void;
  handleContentScrolled: (boolean) => void;
};

const UserProfileContent = ({
  basicInfoItems,
  contactItems,
  addressItems,
  profileData,
  handleDataChanged,
  handleChangePasswordClick,
  handleContentScrolled,
}: UserProfileContentProps
) => {
  const { isXSmall } = useScreenSize();

  const onScroll = useCallback((reachedTop) => {
    handleContentScrolled(reachedTop);
  }, [handleContentScrolled]);

  return (
    <ScrollView
      className='view-wrapper-scroll'
      onScroll={onScroll}
    >
      <div className='cards-container'>
        <ProfileCard
          wrapperCssClass='profile-card basic-info-card'
          title='Basic Info'
          colCount={4}
          cardData={profileData}
          items={basicInfoItems}
          onDataChanged={handleDataChanged}
        >
          <div className='basic-info-top-item profile-card-top-item'>
            <FormPhoto
              link={profileData?.image}
              editable
              size={80}
            />
            <div>
              <div className='title-text'>{profileData?.name}</div>
              <div className='subtitle-text with-clipboard-copy'>
                <span>ID: {profileData?.id}</span>
                <Button icon='copy'
                  className='copy-clipboard-button'
                  stylingMode='text'
                  onClick={copyToClipboard(profileData?.id)}
                  activeStateEnabled={false}
                  focusStateEnabled={false}
                  hoverStateEnabled={false}
                />
              </div>
              <Button
                text='Change Password'
                className='change-password-button'
                stylingMode='contained'
                icon={isXSmall ? void 0 : 'lock'}
                onClick={handleChangePasswordClick}
              />
            </div>
          </div>
        </ProfileCard>

        <ProfileCard
          wrapperCssClass='profile-card contacts-card'
          title='Contacts'
          cardData={profileData}
          items={contactItems}
          onDataChanged={handleDataChanged}
        >
          <div className='profile-card-top-item'>
            <div className='image-wrapper'>
              <i className='dx-icon dx-icon-mention' />
            </div>
            <div>
              <div className='title-text'>
                {formatPhone(profileData?.phone)}
              </div>
              <div className='subtitle-text with-clipboard-copy'>
                {profileData?.email}
                <Button
                  icon='copy'
                  className='copy-clipboard-button'
                  stylingMode='text'
                  onClick={copyToClipboard(profileData?.email)}
                  activeStateEnabled={false}
                  focusStateEnabled={false}
                  hoverStateEnabled={false}
                />
              </div>
            </div>
          </div>
        </ProfileCard>

        <ProfileCard
          wrapperCssClass='profile-card address-card'
          title='Address'
          cardData={profileData}
          items={addressItems}
          onDataChanged={handleDataChanged}
        >
          <div className='profile-card-top-item'>
            <div className='image-wrapper'>
              <i className='dx-icon dx-icon-map' />
            </div>
            <div>
              <div className='title-text'>
                {profileData?.address}, {profileData?.city}, {profileData?.state}, {profileData?.country}
              </div>
            </div>
          </div>
        </ProfileCard>
      </div>
    </ScrollView>
  );
};

const UserProfileContentWithLoadPanel = withLoadPanel(UserProfileContent);

export const UserProfile = () => {
  const [profileData, setProfileData] = useState<Record<string, string>>();
  const [savedProfileData, setSavedProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isChangePasswordPopupOpened, setIsChangedPasswordPopupOpened] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [basicInfoItems, setBasicInfoItems] = useState<ProfileCardItem[]>([]);
  const [contactItems, setContactItems] = useState<ProfileCardItem[]>([]);
  const [addressItems, setAddressItems] = useState<ProfileCardItem[]>([]);
  const [isContentScrolled, setIsContentScrolled] = useState(false);

  const dataChanged = useCallback(() => {
    setIsDataChanged(true);
  }, []);

  const changePassword = useCallback(() => {
    setIsChangedPasswordPopupOpened(true);
  }, []);

  const handleContentScrolled = useCallback((reachedTop) => {
    setIsContentScrolled(!reachedTop);
  }, []);

  const setSavedData = useCallback((data = profileData) => {
    setSavedProfileData(JSON.parse(JSON.stringify(data)));
  }, [profileData]);

  const onCancel = useCallback(() => {
    setProfileData(savedProfileData);
    setSavedData();
    setIsDataChanged(false);
  }, [savedProfileData, setSavedData]);

  const onSave = useCallback(() => {
    notify(
      {
        message: 'Data saved',
        position: {
          at: 'bottom center',
          my: 'bottom center'
        }
      },
      'success');
    setIsDataChanged(false);
    setSavedData();
  }, [profileData, setSavedData]);

  useEffect(() => {
    const supervisorsPromise = getSupervisors();
    const profileDataPromise = getProfile(PROFILE_ID);

    supervisorsPromise.then((data) => {
      setContactItems(service.getContactItems(data));
    });
    profileDataPromise.then((data) => {
      setProfileData(data);
      setSavedData(data);
    });

    Promise.all([
      supervisorsPromise,
      profileDataPromise
    ]).then(() => {
      setIsLoading(false);
    });

    setBasicInfoItems(service.getBasicInfoItems());
    setAddressItems(service.getAddressItems());
  }, []);

  return <div className='view-host user-profile'>
    <div className='view-wrapper'>
      <Toolbar className={`theme-dependent ${isContentScrolled ? 'scrolled' : ''}`}>
        <Item location='before'>
          <div className='header-text'>User Profile</div>
        </Item>
        <Item location='after'
          locateInMenu='never'>
          <Button
            className='cancel-button'
            text='Cancel'
            disabled={!isDataChanged}
            stylingMode='outlined'
            type='normal'
            onClick={onCancel}
          />
        </Item>
        <Item location='after'
          locateInMenu='never'>
          <Button
            disabled={!isDataChanged}
            text='Save'
            icon='save'
            type='default'
            stylingMode='contained'
            onClick={onSave}
          />
        </Item>
      </Toolbar>
      <UserProfileContentWithLoadPanel
        basicInfoItems={basicInfoItems}
        contactItems={contactItems}
        addressItems={addressItems}
        profileData={profileData}
        handleChangePasswordClick={changePassword}
        handleDataChanged={dataChanged}
        handleContentScrolled={handleContentScrolled}
        hasData={!isLoading}
        loading={isLoading}
        panelProps={{
          container: '.view-wrapper',
          position: { of: '.content' },
        }}
      />
    </div>

    <ChangeProfilePasswordForm
      visible={isChangePasswordPopupOpened}
      setVisible={setIsChangedPasswordPopupOpened}
    />
  </div>;
};
