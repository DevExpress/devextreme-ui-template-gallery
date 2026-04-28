import React, { useCallback, useEffect, useState } from 'react';

import { ChatTypes } from 'devextreme-react/chat';
import Splitter, { Item as SplitterItem } from 'devextreme-react/splitter';
import { Item as ToolbarItem } from 'devextreme-react/toolbar';
import Tabs from 'devextreme-react/tabs';
import { LoadPanel } from 'devextreme-react/load-panel';
import ScrollView from 'devextreme-react/scroll-view';

import { useScreenSize } from '../../utils/media-query';

import {
  getOpportunitiesByCategory,
  getSalesByCategory,
  getSales,
  getSalesByStateAndCity,
  calcSalesByState,
} from 'dx-template-gallery-data';

import {
  ToolbarAnalytics,
  RevenueSnapshotCard,
  RevenueAnalysisCard,
  ConversionCard,
  RevenueCard,
  ConversionTicker,
  LeadsTicker,
  OpportunitiesTicker,
  RevenueTotalTicker,
} from '../../components';
import { ChatCardComponent } from '../../components/utils/chat-card-component/ChatCardComponent';
import { ChatFloatingButton } from '../../components/utils/chat-floating-button/ChatFloatingButton';
import { ChatPopup } from '../../components/utils/chat-popup/ChatPopup';
import {
  ANALYTICS_PERIODS,
  DEFAULT_ANALYTICS_PERIOD_KEY,
} from '../../shared/constants';
import {
  Sale,
  SaleOrOpportunityByCategory,
  SaleByState,
} from '../../types/analytics';

import './analytics-dashboard.scss';

const currentUser: ChatTypes.User = {
  id: 'current-user',
  name: 'You',
};

const assistantUser: ChatTypes.User = {
  id: 'ai-assistant',
  name: 'AI Assistant',
};

const createInitialMessages = (): ChatTypes.Message[] => [
  {
    id: 1,
    author: assistantUser,
    text: 'Hello! Ask me about trends, predictions, or what stands out in this dashboard.',
    timestamp: new Date(),
  },
];

const createAssistantReply = (messageText?: string): ChatTypes.Message => ({
  id: `assistant-${Date.now()}`,
  author: assistantUser,
  text: messageText
    ? `I captured your request: "${messageText}". Connect this handler to your backend assistant to return live insights.`
    : 'I can help analyze this dashboard once the assistant backend is connected.',
  timestamp: new Date(),
});

const calculateTotal = (data: (SaleOrOpportunityByCategory & Sale)[]) => {
  return data.reduce((acc, item) => acc + (item.value || item.total), 0);
};

const items = Object.keys(ANALYTICS_PERIODS);

export const AnalyticsDashboard = () => {
  const [tabIndex, setTabIndex] = useState(
    ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].index
  );
  const [dateRange, setDateRange] = useState(
    ANALYTICS_PERIODS[DEFAULT_ANALYTICS_PERIOD_KEY].period.split('/')
  );
  const [opportunities, setOpportunities] = useState<
    SaleOrOpportunityByCategory[]
  >([]);
  const [salesByCategory, setSalesByCategory] = useState<
    SaleOrOpportunityByCategory[]
  >([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [salesByState, setSalesByState] = useState<SaleByState[]>([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [opportunitiesTotal, setOpportunitiesTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tabsWidth, setTabsWidth] = useState<number | string>('auto');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [messages, setMessages] = useState<ChatTypes.Message[]>(
    createInitialMessages
  );

  const { isXSmall, isSmall, isMedium, isLarge } = useScreenSize();
  const isSmallScreen = isXSmall || isSmall;
  const usesSplitterLayout = isPinned && (isMedium || isLarge);

  useEffect(() => {
    if (isSmallScreen && isPinned) {
      setIsPinned(false);
    }
  }, [isSmallScreen, isPinned]);

  useEffect(() => {
    Promise.all([
      getOpportunitiesByCategory(...dateRange).then((data) => {
        setOpportunities(data);
        setOpportunitiesTotal(calculateTotal(data));
      }),
      getSalesByCategory(...dateRange).then((data) => setSalesByCategory(data)),
      getSales(...dateRange).then((data) => {
        setSales(data);
        setSalesTotal(calculateTotal(data));
      }),
      getSalesByStateAndCity(...dateRange)
        .then((data) => calcSalesByState(data))
        .then((data) => setSalesByState(data)),
    ])
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [dateRange]);

  const onTabClick = useCallback((e) => {
    const { index, period } = ANALYTICS_PERIODS[e.addedItems[0]];
    setTabIndex(index);
    setDateRange(period.split('/'));
    setIsLoading(true);
  }, []);

  const openPopup = useCallback(() => {
    setIsPinned(false);
    setIsPopupVisible(true);
  }, []);

  const changePopupVisibility = useCallback((visible: boolean) => {
    setIsPopupVisible(visible);
  }, []);

  const pinChat = useCallback(() => {
    setIsPopupVisible(false);
    setIsPinned(true);
  }, []);

  const unpinChat = useCallback(() => {
    setIsPinned(false);
    setIsPopupVisible(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsPinned(false);
    setIsPopupVisible(false);
  }, []);

  const resetChat = useCallback(() => {
    setMessages(createInitialMessages());
  }, []);

  const onMessageEntered = useCallback(
    ({ message }: ChatTypes.MessageEnteredEvent) => {
      const nextUserMessage: ChatTypes.Message = {
        ...message,
        id: `user-${Date.now()}`,
        author: currentUser,
        timestamp: new Date(),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        nextUserMessage,
        createAssistantReply(nextUserMessage.text),
      ]);
    },
    []
  );

  useEffect(() => {
    setTabsWidth(isXSmall ? 150 : 'auto');
  }, [isXSmall]);

  const dashboardContent = (
    <div className='analytics-dashboard__content'>
      <div className='cards compact'>
        <OpportunitiesTicker value={opportunitiesTotal} />
        <RevenueTotalTicker value={salesTotal} />
        <ConversionTicker value={16} />
        <LeadsTicker value={51} />
      </div>
      <div className='cards normal'>
        <RevenueCard datasource={sales} />
        <ConversionCard datasource={opportunities} />
        <RevenueAnalysisCard datasource={salesByState} />
        <RevenueSnapshotCard datasource={salesByCategory} />
      </div>
    </div>
  );

  return (
    <ScrollView className='view-wrapper-scroll'>
      <ToolbarAnalytics
        title='Dashboard'
        additionalToolbarContent={
          <ToolbarItem location='before'>
            <Tabs
              width={tabsWidth}
              scrollByContent
              showNavButtons={false}
              dataSource={items}
              selectedIndex={tabIndex}
              onSelectionChanged={onTabClick}
            />
          </ToolbarItem>
        }
      >
        <div className='analytics-dashboard__layout'>
          {usesSplitterLayout ? (
            <Splitter
              className='analytics-dashboard__splitter'
              orientation='horizontal'
              separatorSize={12}
            >
              <SplitterItem minSize='0' resizable>
                <div className='analytics-dashboard__pane analytics-dashboard__pane--main'>
                  {dashboardContent}
                </div>
              </SplitterItem>
              <SplitterItem size={420} minSize={340} maxSize='50%' resizable>
                <div className='analytics-dashboard__pane analytics-dashboard__pane--chat'>
                  <ChatCardComponent
                    messages={messages}
                    currentUser={currentUser}
                    onMessageEntered={onMessageEntered}
                    onResetClick={resetChat}
                    onCloseClick={closeChat}
                    onUnpinClick={unpinChat}
                  />
                </div>
              </SplitterItem>
            </Splitter>
          ) : (
            <>
              {dashboardContent}
              {isPinned && (isSmall || isXSmall) && (
                <div className='analytics-dashboard__chat-stack analytics-dashboard__chat-stack--mobile'>
                  <ChatCardComponent
                    messages={messages}
                    currentUser={currentUser}
                    onMessageEntered={onMessageEntered}
                    onResetClick={resetChat}
                    onCloseClick={closeChat}
                    onUnpinClick={unpinChat}
                  />
                </div>
              )}
              {!isPinned && !isPopupVisible && <ChatFloatingButton onClick={openPopup} />}
            </>
          )}

          <ChatPopup
            visible={isPopupVisible}
            setVisible={changePopupVisibility}
            messages={messages}
            currentUser={currentUser}
            onMessageEntered={onMessageEntered}
            onResetClick={resetChat}
            onPinClick={pinChat}
          />
        </div>
      </ToolbarAnalytics>
      <LoadPanel
        container='.content'
        visible={isLoading}
        position={{ of: '.layout-body' }}
      />
    </ScrollView>
  );
};
