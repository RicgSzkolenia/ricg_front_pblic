import ReactGA4 from 'react-ga4';

export const trackGoogleAnalyticsEvent = (
    category:any,
    event_name:any,
    label:any,
    data:any
) => {

    let event_params = {
        category,
        label,
        ...data
    };
    // Send GA4 Event
    ReactGA4.event(event_name, event_params);
};
