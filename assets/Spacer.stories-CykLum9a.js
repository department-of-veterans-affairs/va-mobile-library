import{j as e,d as l}from"./iframe-DtTAheQm.js";import{B as s,a as u}from"./Button-bXnsy3jL.js";import{I as x}from"./Icon-DvZUmOSO.js";import{L as d}from"./Link-DFlg8K-P.js";import{S}from"./Spacer-BrGUVpYw.js";import"./index-COaUtNbr.js";import"./spacing-7F7YAbWY.js";import"./style-CWKZkgy7.js";import"./wrapper-CKuq8dMv.js";import"./tokens-BgsHx23W.js";const L={title:"Spacer",component:S},t={args:{horizontal:!0},decorators:[o=>e.jsxs(l.View,{style:{alignItems:"center",flexDirection:"row"},children:[e.jsx(x,{name:"Info",preventScaling:!0}),e.jsx(o,{}),e.jsx(d,{text:"Link text after Spacer",type:"custom",onPress:()=>{}})]})]},r={decorators:[o=>e.jsxs(l.View,{style:{alignItems:"center",flexDirection:"column"},children:[e.jsx(s,{label:"Button before Spacer",onPress:()=>{}}),e.jsx(o,{}),e.jsx(s,{label:"Button after Spacer",buttonType:u.Secondary,onPress:()=>{}})]})]};var a,n,c;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    horizontal: true
  },
  decorators: [Story => <View style={{
    alignItems: 'center',
    flexDirection: 'row'
  }}>
        <Icon name="Info" preventScaling />
        <Story />
        <Link text="Link text after Spacer" type="custom" onPress={() => {}} />
      </View>]
}`,...(c=(n=t.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  decorators: [Story => <View style={{
    alignItems: 'center',
    flexDirection: 'column'
  }}>
        <Button label="Button before Spacer" onPress={() => {}} />
        <Story />
        <Button label="Button after Spacer" buttonType={ButtonVariants.Secondary} onPress={() => {}} />
      </View>]
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const h=["Horizontal","Vertical"];export{t as Horizontal,r as Vertical,h as __namedExportsOrder,L as default};
