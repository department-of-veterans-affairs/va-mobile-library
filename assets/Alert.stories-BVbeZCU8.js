import{d as n,r as ie,j as e}from"./iframe-D69x0NRx.js";import{f as ce}from"./index-COaUtNbr.js";import{s as o}from"./spacing-7F7YAbWY.js";import{a as de,u as pe,B as ue}from"./style-tO4gk4Rh.js";import{a as m,B as P}from"./Button-DqRCturW.js";import{I as k}from"./Icon-Dk7fbPP1.js";import{S as t}from"./Spacer-WpXvr5Yr.js";import{T as D}from"./Text-B7Rb6yL7.js";import{L}from"./Link-0GQSWbqK.js";import"./tokens-BgsHx23W.js";import"./wrapper-A2R-2GTX.js";const C=ue,j=({variant:b,header:l,headerA11yLabel:U,description:i,descriptionA11yLabel:G,children:B,expandable:u,initializeExpanded:J,analytics:r,primaryButton:v,secondaryButton:S,testID:K})=>{const Q=de(),a=pe(),Z=n.useWindowDimensions().fontScale,_=Q==="dark",[s,$]=ie.useState(u?J:!0),{typography:T}=ce,ee=()=>{s&&(r!=null&&r.onCollapse)&&r.onCollapse(),!s&&(r!=null&&r.onExpand)&&r.onExpand(),$(!s)},w=C();let c,d,p;switch(b){case"info":c=a.vadsColorFeedbackSurfaceInfo,d=a.vadsColorFeedbackBorderInfo,p="Info";break;case"success":c=a.vadsColorFeedbackSurfaceSuccess,d=a.vadsColorFeedbackBorderSuccess,p="CheckCircle";break;case"warning":c=a.vadsColorFeedbackSurfaceWarning,d=a.vadsColorFeedbackBorderWarning,p="Warning";break;case"error":c=a.vadsColorFeedbackSurfaceError,d=a.vadsColorFeedbackBorderError,p="Error";break}const ne={backgroundColor:c,borderLeftColor:d,borderLeftWidth:o.vadsSpaceXs,padding:o.vadsSpaceLg,paddingLeft:o.vadsSpaceSm,width:"100%"},E={flexDirection:"row",alignSelf:"flex-start",minHeight:(l?T.vadsFontHeadingSmall.lineHeight:T.vadsFontBodyLarge.lineHeight)*Z,alignItems:"center",justifyContent:"center"},oe=e.jsxs(n.View,{style:E,children:[e.jsx(k,{fill:w,name:p,preventScaling:!0}),e.jsx(t,{size:"xs",horizontal:!0})]}),re=e.jsxs(n.View,{style:E,children:[e.jsx(t,{horizontal:!0}),e.jsx(k,{fill:w,name:s?"ExpandLess":"ExpandMore",preventScaling:!0})]}),ae=()=>{if(!l)return null;const V=e.jsx(D,{variant:"heading",size:"sm",bottomSpacing:"none",children:l}),A=U||l;if(u){const le={left:o.vadsSpaceLg+o.vadsSpaceXs+o.vadsSpaceXl,top:o.vadsSpaceLg,bottom:s?o.vadsSpaceSm:o.vadsSpaceLg,right:o.vadsSpaceLg};return e.jsxs(n.Pressable,{onPress:ee,role:"tab","aria-expanded":s,"aria-label":A,hitSlop:le,style:{flexDirection:"row"},children:[e.jsx(n.View,{style:{flex:1},children:V}),re]})}return e.jsx(n.View,{accessible:!0,"aria-label":A,role:"heading",children:V})},se=()=>v?(v.buttonType=_?m.Base:m.Primary,e.jsxs(e.Fragment,{children:[e.jsx(t,{size:"lg"}),e.jsx(P,{...v})]})):null,te=()=>S?(S.buttonType=_?m.BaseSecondary:m.Secondary,e.jsxs(e.Fragment,{children:[e.jsx(t,{size:"lg"}),e.jsx(P,{...S})]})):null;return e.jsxs(n.View,{style:ne,testID:K,role:u?"tablist":"none",children:[e.jsxs(n.View,{style:{flexDirection:"row"},children:[oe,e.jsxs(n.View,{style:{flex:1},children:[ae(),s&&e.jsxs(n.View,{style:{flexDirection:"row"},children:[e.jsxs(n.View,{style:{flex:1},children:[l&&(i||B)?e.jsx(t,{size:"lg"}):null,i?e.jsx(D,{variant:"body",size:"lg",bottomSpacing:"none",a11yLabel:G||i,children:i}):null,i&&B?e.jsx(t,{size:"lg"}):null,B]}),u?e.jsx(t,{size:"4xl",horizontal:!0}):null]})]})]}),s&&e.jsxs(e.Fragment,{children:[se(),te()]})]})};try{C.displayName="AlertContentColor",C.__docgenInfo={description:"Convenience function to set children content color correctly with light/dark mode",displayName:"AlertContentColor",props:{}}}catch{}try{j.displayName="Alert",j.__docgenInfo={description:"#### [<u>View guidance for the Alert component on the VA Design System</u>](https://design.va.gov/components/alert/)",displayName:"Alert",props:{variant:{defaultValue:null,description:"Alert variant",name:"variant",required:!0,type:{name:"enum",value:[{value:'"info"'},{value:'"success"'},{value:'"warning"'},{value:'"error"'}]}},headerA11yLabel:{defaultValue:null,description:"Optional a11y override for header",name:"headerA11yLabel",required:!1,type:{name:"string"}},description:{defaultValue:null,description:"Optional description text",name:"description",required:!1,type:{name:"string"}},descriptionA11yLabel:{defaultValue:null,description:"Optional a11y override for description",name:"descriptionA11yLabel",required:!1,type:{name:"string"}},children:{defaultValue:null,description:`Optional custom content to nest inside Alert
Use AlertContentColor or appropriate component props to set light/dark mode 'base' gray colors`,name:"children",required:!1,type:{name:"ReactNode"}},primaryButton:{defaultValue:null,description:"Optional primary action button",name:"primaryButton",required:!1,type:{name:"ButtonProps"}},secondaryButton:{defaultValue:null,description:"Optional secondary action button",name:"secondaryButton",required:!1,type:{name:"ButtonProps"}},analytics:{defaultValue:null,description:"Optional analytics event logging",name:"analytics",required:!1,type:{name:"AlertAnalytics"}},testID:{defaultValue:null,description:"Optional testID",name:"testID",required:!1,type:{name:"string"}},expandable:{defaultValue:null,description:"True to make the Alert expandable",name:"expandable",required:!1,type:{name:"boolean"}},header:{defaultValue:null,description:`Header text. Required when Alert is expandable
Header text. Optional when Alert is not expandable`,name:"header",required:!1,type:{name:"string"}},initializeExpanded:{defaultValue:null,description:"True if Alert should start expanded. Defaults to false",name:"initializeExpanded",required:!1,type:{name:"boolean"}}}}}catch{}const je={title:"Alert",component:j},h=e.jsxs(e.Fragment,{children:[e.jsx(L,{type:"call",text:"000-000-0000",phoneNumber:"000-000-0000",variant:"base"}),e.jsx(t,{}),e.jsx(L,{type:"call TTY",text:"TTY: 711",TTYnumber:"711",variant:"base"})]}),g={args:{variant:"info",header:"Header",description:"Description",children:h,analytics:{onExpand:()=>console.log("expanded"),onCollapse:()=>console.log("collapsed")},primaryButton:{label:"Button Text",onPress:()=>console.log("primary press")},secondaryButton:{label:"Button Text",onPress:()=>console.log("secondary press")}}},x={args:{variant:"success",header:"Header",description:"Description",children:h,analytics:{onExpand:()=>console.log("expanded"),onCollapse:()=>console.log("collapsed")},primaryButton:{label:"Button Text",onPress:()=>console.log("primary press")},secondaryButton:{label:"Button Text",onPress:()=>console.log("secondary press")}}},y={args:{variant:"warning",header:"Header",description:"Description",children:h,analytics:{onExpand:()=>console.log("expanded"),onCollapse:()=>console.log("collapsed")},primaryButton:{label:"Button Text",onPress:()=>console.log("primary press")},secondaryButton:{label:"Button Text",onPress:()=>console.log("secondary press")}}},f={args:{variant:"error",header:"Header",description:"Description",children:h,analytics:{onExpand:()=>console.log("expanded"),onCollapse:()=>console.log("collapsed")},primaryButton:{label:"Button Text",onPress:()=>console.log("primary press")},secondaryButton:{label:"Button Text",onPress:()=>console.log("secondary press")}}};var F,H,I;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    header: 'Header',
    description: 'Description',
    children: children,
    analytics: {
      onExpand: () => console.log('expanded'),
      onCollapse: () => console.log('collapsed')
    },
    primaryButton: {
      label: 'Button Text',
      onPress: () => console.log('primary press')
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => console.log('secondary press')
    }
  }
}`,...(I=(H=g.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var q,z,O;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    header: 'Header',
    description: 'Description',
    children: children,
    analytics: {
      onExpand: () => console.log('expanded'),
      onCollapse: () => console.log('collapsed')
    },
    primaryButton: {
      label: 'Button Text',
      onPress: () => console.log('primary press')
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => console.log('secondary press')
    }
  }
}`,...(O=(z=x.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};var N,W,R;y.parameters={...y.parameters,docs:{...(N=y.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    header: 'Header',
    description: 'Description',
    children: children,
    analytics: {
      onExpand: () => console.log('expanded'),
      onCollapse: () => console.log('collapsed')
    },
    primaryButton: {
      label: 'Button Text',
      onPress: () => console.log('primary press')
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => console.log('secondary press')
    }
  }
}`,...(R=(W=y.parameters)==null?void 0:W.docs)==null?void 0:R.source}}};var X,Y,M;f.parameters={...f.parameters,docs:{...(X=f.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    header: 'Header',
    description: 'Description',
    children: children,
    analytics: {
      onExpand: () => console.log('expanded'),
      onCollapse: () => console.log('collapsed')
    },
    primaryButton: {
      label: 'Button Text',
      onPress: () => console.log('primary press')
    },
    secondaryButton: {
      label: 'Button Text',
      onPress: () => console.log('secondary press')
    }
  }
}`,...(M=(Y=f.parameters)==null?void 0:Y.docs)==null?void 0:M.source}}};const _e=["Info","_Success","__Warning","___Error"];export{g as Info,x as _Success,y as __Warning,f as ___Error,_e as __namedExportsOrder,je as default};
