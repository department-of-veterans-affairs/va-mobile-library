import{j as e,d as k,r as E}from"./iframe-DtTAheQm.js";import{s as _}from"./spacing-7F7YAbWY.js";import{H as L,a as P,E as z,C as M}from"./CheckboxRadio-Cn0Ifhcl.js";import{u as N,C as F}from"./wrapper-CKuq8dMv.js";import{S as s}from"./Spacer-BrGUVpYw.js";import{u as J}from"./style-CWKZkgy7.js";import"./index-COaUtNbr.js";import"./Text-CJRnnKoZ.js";import"./tokens-BgsHx23W.js";import"./Icon-DvZUmOSO.js";const c=({items:n,selectedItem:p,error:r,header:o,hint:a,onSelectionChange:u,required:m,testID:h,tile:f})=>{const x=J(),{t:H}=N();let g={width:"100%"};return r&&(g={...g,borderLeftWidth:_.vadsSpace2xs,borderColor:x.vadsColorFormsBorderError,paddingLeft:_.vadsSpaceMd}),e.jsx(F,{children:e.jsxs(k.View,{style:g,testID:h,children:[e.jsx(L,{text:o,required:m}),o&&e.jsx(s,{size:"xs"}),e.jsx(P,{text:a}),a&&e.jsx(s,{size:"xs"}),e.jsx(z,{text:r}),r&&e.jsx(s,{size:"xs"}),n.map((t,y)=>{const b=typeof t=="object",I=b?t.value||t.text:t,W=H("listPosition",{position:y+1,total:n.length});return e.jsxs(E.Fragment,{children:[e.jsx(M,{label:t,a11yListPosition:W,description:b?t.description:void 0,checked:p===I,onPress:()=>u(I),radio:!0,testID:b?t.testID:void 0,tile:f}),y<n.length-1&&e.jsx(s,{size:"sm"})]},`radio-button-item-${y}`)})]})})};try{c.displayName="RadioButton",c.__docgenInfo={description:`#### [<u>View guidance for the Radio button component on the VA Mobile Documentation Site</u>](https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Selection%20and%20input/RadioButton)

### Managing checked item state
The state of the selected radio item should be provided to RadioButton via the \`selectedItem\` prop and updated
using the \`onSelectionChange\` callback. When a radio is tapped, the provided \`onSelectionChange\` callback
function is fired and passed the newly \`selectedItem\`, which can be used to update the parent
component's state, whether that be redux, zustand, useState, or any other state management methods. Here is a basic
example using the \`useState\` hook to store the state of the \`selectedItem\`:

\`\`\`jsx
export const ParentComponent = () => {
  const [selectedItem, setSelectedItem] = useState()

  const onSelectionChange = (updatedItem) => setSelectedItem(updatedItem)

  const items = ['Option 1', 'Option 2', 'Option 3']

  return (
    <RadioButton
      items={items}
      onSelectionChange={onSelectionChange}
    />
  )

}
\`\`\`

### Providing values or accessibility labels
RadioButton can accept a simple array of strings to display as radios as shown above. If you want to provide
values for each item that differ from display labels, or you want to provide accessibility labels for certain items,
you can pass an array of objects containing these optional fields as well. For example:

\`\`\`jsx
export const ParentComponent = () => {
  const [selectedItem, setSelectedItem] = useState()

  const onSelectionChange = (updatedItem) => setSelectedItem(updatedItem)

  const items = [
   { text: 'Minnesota', value: 'MN' },
   { text: 'California', value: 'CA' },
   { text: 'New Jersey', value: 'NJ' },
   { text: 'Washington D.C.', value: 'DC', a11yLabel: 'District of Columbia' },
  ]

  return (
    <RadioButton
      items={items}
      onSelectionChange={onSelectionChange}
    />
  )

}
\`\`\``,displayName:"RadioButton",props:{error:{defaultValue:null,description:"Optional error text. If present, applies error styling to element",name:"error",required:!1,type:{name:"StringOrTextWithA11y"}},header:{defaultValue:null,description:"Header text",name:"header",required:!1,type:{name:"StringOrTextWithA11y"}},hint:{defaultValue:null,description:"Hint text. Appears below header",name:"hint",required:!1,type:{name:"StringOrTextWithA11y"}},required:{defaultValue:null,description:"True to append (*Required) suffix to element",name:"required",required:!1,type:{name:"boolean"}},testID:{defaultValue:null,description:"Optional TestID",name:"testID",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"Array of radio options. Can be an array containing strings or objects if values or a11y overrides are needed",name:"items",required:!0,type:{name:"string[] | TextWithA11yAndValue[]"}},onSelectionChange:{defaultValue:null,description:"Callback function that receives an updated selected value when a radio is pressed",name:"onSelectionChange",required:!0,type:{name:"(selected: string | number) => void"}},selectedItem:{defaultValue:null,description:"The label or value (if provided) of currently selected radio, if any",name:"selectedItem",required:!1,type:{name:"string | number"}},tile:{defaultValue:null,description:"True to apply tile styling",name:"tile",required:!1,type:{name:"boolean"}}}}}catch{}const oe={title:"Radio button",component:c},S=n=>{const{error:p,header:r,hint:o,items:a,required:u,tile:m}=n,[h,f]=E.useState();return e.jsx(c,{items:a,selectedItem:h,error:p,header:r,hint:o,onSelectionChange:x=>f(x),required:u,tile:m})},B=[{text:"Option 1",description:"Description for option 1"},{text:"Option 2",a11yLabel:"Accessibility override for option 2",value:"2",description:{text:"Description for option 2",a11yLabel:"Accessibility override for description"}},{text:"Option 3"},{text:"Option 4"},{text:"Option 5"},{text:"Option 6"}],$=["Option 1","Option 2","Option 3","Option 4"],v="Header",C={text:"Hint text",a11yLabel:"Accessibility override for hint"},G={text:"Error text"},i={render:S,args:{header:v,hint:C,items:B,required:!0}},d={render:S,args:{header:v,hint:C,items:$,tile:!0}},l={render:S,args:{error:G,header:v,hint:C,items:B,required:!0}};var j,O,q;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    items,
    required: true
  }
}`,...(q=(O=i.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var R,w,D;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    items: simpleItems,
    tile: true
  }
}`,...(D=(w=d.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var T,V,A;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    error,
    header,
    hint,
    items,
    required: true
  }
}`,...(A=(V=l.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};const ae=["_Default","__Tile","___Error"];export{i as _Default,d as __Tile,l as ___Error,ae as __namedExportsOrder,oe as default};
