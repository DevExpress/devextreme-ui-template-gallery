import './user-profile.scss';
import React, { useState, useCallback } from 'react';

import notify from 'devextreme/ui/notify';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import ScrollView from 'devextreme-react/scroll-view';
import { service } from './user-profile-service';
import { FormPhoto } from '../../components';
import { withLoadPanel } from '../../utils/withLoadPanel';

const copyToClipboard = (text) => (evt) => {
  window.navigator.clipboard?.writeText(text);
  const tipText = 'Text copied';
  notify(
    {
      message: tipText,
      minWidth: `${tipText.length + 2}ch`,
      width: 'auto',
      position: { of: evt.target, offset: '0 -30' }
    },
    'info',
    500
  );
};

export const UserProfile = () => {
  const [profileId, setProfileId] = useState(22);
  const [profileData, setProfileData] = useState<Record<string, any>>();
  const [savedProfileData, setSavedProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [supervisorsList, setSupervisorsList] = useState([]);
  const [isChangePasswordPopupOpened, setIsChangedPasswordPopupOpened] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isContentScrolled, setIsContentScrolled] = useState(false);
  const [basicInfoItems, setBasicInfoItems] = useState(service.getBasicInfoItems());
  const [contactItems, setContactItems] = useState(service.getContactItems(supervisorsList)); //probably move to useEffect
  const [addressItems, setAddressItems] = useState(service.getAddressItems());

  const dataChanged = useCallback(() => {
    setIsDataChanged(true);
  }, []);

  const setSavedData = useCallback((data = profileData) => {
    setSavedProfileData(JSON.parse(JSON.stringify(data)));
  }, []);

  const changePassword = useCallback(() => {
    setIsChangedPasswordPopupOpened(true);
  }, []);

  const onCancel = useCallback(() => {
    setProfileData(savedProfileData);
    // ref detect changes??
    setSavedData();
    setTimeout(() => { // don't know why is setTimeout is used here
      setIsDataChanged(false);
    });
  }, [savedProfileData]);

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
  }, []);

  const onScroll = useCallback((reachedTop) => {
    setIsContentScrolled(!reachedTop);
  }, []);

  return <>
    <div className='view-wrapper'>
      <Toolbar className={isContentScrolled ? 'scrolled' : ''}>
        <Item location='before'>
          <div className='header-text'>User Profile</div>
        </Item>
        <Item location='after'
          locateInMenu='never'>
          <Button
            text='Cancel'
            disabled={!isDataChanged}
            stylingMode='contained'
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
      {/* <dx-load-panel
        visible={isLoading}
        showPane={false}
        container=".view-wrapper-scroll"
        position={{ of: 'user-profile' }}
      /> */}
      <ScrollView
        className='view-wrapper-scroll'
        onScroll={onScroll}
      >
        {/* {!isLoading && } */}
        <div
          className='cards-container'
        >

          <ProfileCard className='profile-card basic-info-card'
            title='Basic Info'
            colCount={4}
            cardData={profileData}
            items={basicInfoItems}
            dataChanged={dataChanged}
          >
            <div className='basic-info-top-item'>
              <FormPhoto
                link={profileData?.image}
                // editable
                size={80}
              />
              <div>
                <div className='title-text'>{profileData?.name}</div>
                <div className='subtitle-text with-clipboard-copy'>
                  <span>ID: {profileData?.id}</span>
                  <Button icon='copy'
                    className='copy-clipboard-button'
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
                  icon={(screen.xSmallScreenChanged | async) ? null : 'lock'} // pipe here
                  onClick={changePassword}
                />
              </div>
            </div> :
          </ProfileCard >

          <ProfileCard className='profile-card contacts-card'
            title='Contacts'
            cardData={profileData}
            items={contactItems}
            dataChanged={dataChanged}
          >
            <div>
              <div className='image-wrapper'>
                <img alt='' src='assets/icons/at.svg' />
              </div>
              <div>
                <div className='title-text'>
                  {profileData?.phone | phone}
                  {/* is it pipe? */}
                </div>
                <div className='subtitle-text with-clipboard-copy'>
                  {profileData?.email}
                  <Button
                    icon='copy'
                    className='copy-clipboard-button'
                    onClick={copyToClipboard(profileData?.email)}
                    activeStateEnabled={false}
                    focusStateEnabled={false}
                    hoverStateEnabled={false}
                  />
                </div>
              </div>
            </div>
          </ProfileCard >

          <ProfileCard class='profile-card address-card'
            title='Address'
            cardData={profileData}
            items={addressItems}
            dataChanged={dataChanged}
          >
            <div>
              <div className='image-wrapper'>
                <img alt='' src='assets/icons/geo-position.svg' />
              </div>
              <div>
                <div className='title-text'>
                  {profileData.address}, {profileData.city}, {profileData.state}, {profileData.country}
                </div>
              </div>
            </div>
          </ProfileCard>
        </div>
      </ScrollView>
    </div>

    <ChangeProfilePasswordForm visible={isChangePasswordPopupOpened}></ChangeProfilePasswordForm >
  </>;
};
