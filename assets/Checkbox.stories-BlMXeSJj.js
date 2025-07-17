import{r as H,j as T}from"./iframe-D69x0NRx.js";import{C as k}from"./Checkbox-DqdU3oED.js";import"./CheckboxRadio-DBarGzv7.js";import"./index-COaUtNbr.js";import"./spacing-7F7YAbWY.js";import"./Text-B7Rb6yL7.js";import"./style-tO4gk4Rh.js";import"./tokens-BgsHx23W.js";import"./wrapper-A2R-2GTX.js";import"./Icon-Dk7fbPP1.js";import"./Spacer-WpXvr5Yr.js";const U={title:"Checkbox",component:k},n=E=>{const{description:R,error:L,header:S,hint:v,indeterminate:A,label:j,required:q,tile:D}=E,[d,O]=H.useState(!1);return T.jsx(k,{checked:d,description:R,error:L,header:S,hint:v,indeterminate:A,label:j,onPress:()=>O(!d),required:q,tile:D})},a="Header",i={text:"Hint text",a11yLabel:"Accessibility override for hint"},P={text:"Error text",a11yLabel:"Accessibility override for error"},s={text:"Label",a11yLabel:"Accessibility override for label"},c={text:"Description",a11yLabel:"Accessibility override for description"},e={render:n,args:{header:a,hint:i,label:s,description:c,required:!0}},r={render:n,args:{tile:!0,header:a,hint:i,label:s,description:c}},t={render:n,args:{label:s}},o={render:n,args:{header:a,hint:i,error:P,label:s,description:c}};var l,p,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    label,
    description,
    required: true
  }
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,b,_;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    tile: true,
    header,
    hint,
    label,
    description
  }
}`,...(_=(b=r.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};var h,x,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    label
  }
}`,...(f=(x=t.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var g,C,y;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    error,
    label,
    description
  }
}`,...(y=(C=o.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};const V=["_Default","__Tile","___CheckboxOnly","____Error"];export{e as _Default,r as __Tile,t as ___CheckboxOnly,o as ____Error,V as __namedExportsOrder,U as default};
