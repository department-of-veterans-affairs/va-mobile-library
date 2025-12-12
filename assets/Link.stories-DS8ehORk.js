import{L as U}from"./Link-Bru8K73V.js";import"./iframe-Ca0jHIAA.js";import"./index-COaUtNbr.js";import"./spacing-7F7YAbWY.js";import"./wrapper-BUO9RsJT.js";import"./style-ByjIiaOi.js";import"./Icon-CABC-fGi.js";import"./Spacer-B3ItHKAo.js";import"./tokens-BgsHx23W.js";const K={title:"Link",component:U,argTypes:{onPress:{action:"onPress event"}}},e={args:{text:"Link opens in the app",type:"custom",onPress:()=>{},analytics:{onPress:()=>console.log("Analytics event: Pressed")}}},n={name:"Default (with icon)",args:{text:"Link opens an external app",icon:{name:"CleanHands"},type:"custom",onPress:()=>{}}},t={args:{text:"Attachment.pdf",onPress:void 0,type:"attachment",a11yValue:{index:2,total:5}}},o={args:{text:"Add to calendar",onPress:void 0,type:"calendar"}},l={lat:33.7764681,long:-118.1189664,address:{street:"5901 E 7th St",city:"Long Beach",state:"CA",zipCode:"90822"}},s={args:{text:"Get directions",onPress:void 0,type:"directions",locationData:{name:"VA Long Beach Healthcare System",address:l.address,latitude:l.lat,longitude:l.long},promptText:{body:"You're navigating to your Maps app.",cancel:"No thanks",confirm:"Let's go!",title:"Title override"},a11yLabel:"Get directions with Maps app",a11yHint:"Opens maps app with directions to the location"}},r={args:{text:"Link opens in external browser",onPress:void 0,type:"url",url:"https://www.va.gov/",analytics:{onCancel:()=>console.log("Analytics event: Canceled"),onPress:()=>console.log("Analytics event: Pressed"),onConfirm:()=>console.log("Analytics event: Confirmed"),onOpenURLError:(p,R)=>{console.log(JSON.stringify(p)),console.log("Error: "+p),console.log("Error opening URL: "+R)}}}},a={args:{text:"000-000-0000",onPress:void 0,type:"call",phoneNumber:"000-000-0000"}},c={args:{text:"TTY: 711",onPress:void 0,type:"call TTY",TTYnumber:"711"}},i={args:{text:"Text 000000",onPress:void 0,type:"text",textNumber:"000000"}};var d,m,u;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    text: 'Link opens in the app',
    type: 'custom',
    onPress: () => {},
    analytics: {
      onPress: () => console.log('Analytics event: Pressed')
    }
  }
}`,...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,y,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Default (with icon)',
  args: {
    text: 'Link opens an external app',
    icon: {
      name: 'CleanHands'
    },
    type: 'custom',
    onPress: () => {}
  }
}`,...(h=(y=n.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var x,f,P;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    text: 'Attachment.pdf',
    onPress: undefined,
    // Storybook sends a truthy function shell otherwise
    type: 'attachment',
    a11yValue: {
      index: 2,
      total: 5
    }
  }
}`,...(P=(f=t.parameters)==null?void 0:f.docs)==null?void 0:P.source}}};var T,v,L;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    text: 'Add to calendar',
    onPress: undefined,
    // Storybook sends a truthy function shell otherwise
    type: 'calendar'
  }
}`,...(L=(v=o.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var w,S,b;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    text: 'Get directions',
    onPress: undefined,
    // Storybook sends a truthy function shell otherwise
    type: 'directions',
    locationData: {
      name: 'VA Long Beach Healthcare System',
      address: location.address,
      latitude: location.lat,
      longitude: location.long
    },
    promptText: {
      body: "You're navigating to your Maps app.",
      cancel: 'No thanks',
      confirm: "Let's go!",
      title: 'Title override'
    },
    a11yLabel: 'Get directions with Maps app',
    a11yHint: 'Opens maps app with directions to the location'
  }
}`,...(b=(S=s.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var k,A,_;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    text: 'Link opens in external browser',
    onPress: undefined,
    // Storybook sends a truthy function shell otherwise
    type: 'url',
    url: 'https://www.va.gov/',
    analytics: {
      onCancel: () => console.log('Analytics event: Canceled'),
      onPress: () => console.log('Analytics event: Pressed'),
      onConfirm: () => console.log('Analytics event: Confirmed'),
      onOpenURLError: (e, url) => {
        console.log(JSON.stringify(e));
        console.log('Error: ' + e);
        console.log('Error opening URL: ' + url);
      }
    }
  }
}`,...(_=(A=r.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};var C,D,E;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    text: '000-000-0000',
    onPress: undefined,
    // Storybook sends a truthy function shell otherwise
    type: 'call',
    phoneNumber: '000-000-0000'
  }
}`,...(E=(D=a.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var Y,N,O;c.parameters={...c.parameters,docs:{...(Y=c.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    text: 'TTY: 711',
    onPress: undefined,
    // Storybook sends a truthy function shell otherwise
    type: 'call TTY',
    TTYnumber: '711'
  }
}`,...(O=(N=c.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var H,G,M;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    text: 'Text 000000',
    onPress: undefined,
    // Storybook sends a truthy function shell otherwise
    type: 'text',
    textNumber: '000000'
  }
}`,...(M=(G=i.parameters)==null?void 0:G.docs)==null?void 0:M.source}}};const Q=["Default","DefaultWithIcon","_Attachment","_Calendar","_Directions","_ExternalLink","_Phone","_PhoneTTY","_Text"];export{e as Default,n as DefaultWithIcon,t as _Attachment,o as _Calendar,s as _Directions,r as _ExternalLink,a as _Phone,c as _PhoneTTY,i as _Text,Q as __namedExportsOrder,K as default};
