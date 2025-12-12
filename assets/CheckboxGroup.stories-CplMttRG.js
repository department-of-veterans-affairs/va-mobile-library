import{j as e,d as P,r as E}from"./iframe-Ca0jHIAA.js";import{s as I}from"./spacing-7F7YAbWY.js";import{C as R}from"./Checkbox-DUMCVwtY.js";import{u as z,C as M}from"./wrapper-BUO9RsJT.js";import{H as N,a as F,E as J}from"./CheckboxRadio-U8-JFW3h.js";import{S as l}from"./Spacer-B3ItHKAo.js";import{u as B}from"./style-ByjIiaOi.js";import"./index-COaUtNbr.js";import"./Text-DHQipIR6.js";import"./tokens-BgsHx23W.js";import"./Icon-CABC-fGi.js";const m=({items:n,selectedItems:r,error:o,header:a,hint:i,onSelectionChange:c,required:h,testID:x,tile:f})=>{const b=B(),{t:H}=z(),W=t=>{r.includes(t)?c(r.filter(s=>s!==t)):c([...r,t])};let g={width:"100%"};return o&&(g={...g,borderLeftWidth:I.vadsSpace2xs,borderColor:b.vadsColorFormsBorderError,paddingLeft:I.vadsSpaceMd}),e.jsx(M,{children:e.jsxs(P.View,{style:g,testID:x,children:[e.jsx(N,{text:a,required:h}),a&&e.jsx(l,{size:"xs"}),e.jsx(F,{text:i}),i&&e.jsx(l,{size:"xs"}),e.jsx(J,{text:o}),o&&e.jsx(l,{size:"xs"}),n.map((t,s)=>{const y=typeof t=="object",k=y?t.value||t.text:t,L=H("listPosition",{position:s+1,total:n.length});return e.jsxs(E.Fragment,{children:[e.jsx(R,{label:t,a11yListPosition:L,description:y?t.description:void 0,checked:r.includes(k),onPress:()=>W(k),testID:y?t.testID:void 0,tile:f}),s<n.length-1&&e.jsx(l,{size:"sm"})]},`checkbox-group-item-${s}`)})]})})};try{m.displayName="CheckboxGroup",m.__docgenInfo={description:`#### [<u>View guidance for the Checkbox Group component on the VA Mobile Documentation Site</u>](https://department-of-veterans-affairs.github.io/va-mobile-app/design/Components/Selection%20and%20Input/Checkbox/)

### Managing checked item state
The state of the selected checkbox items should be provided to CheckboxGroup via the \`selectedItems\` prop and updated
using the \`onSelectionChange\` callback. When a checkbox is tapped, the provided \`onSelectionChange\` callback
function is fired and passed an array of the newly \`selectedItems\`, which can be used to update the parent
component's state, whether that be redux, zustand, useState, or any other state management methods. Here is a basic
example using the \`useState\` hook to store the state of the \`selectedItems\`:

\`\`\`jsx
export const ParentComponent = () => {
  const [selectedItems, setSelectedItems] = useState([])

  const onSelectionChange = (updatedItems) => setSelectedItems(updatedItems)

  const items = ['Option 1', 'Option 2', 'Option 3']

  return (
    <CheckboxGroup
      items={items}
      onSelectionChange={onSelectionChange}
    />
  )

}
\`\`\`

### Providing values or accessibility labels
CheckboxGroup can accept a simple array of strings to display as checkboxes as shown above. If you want to provide
values for each item that differ from display labels, or you want to provide accessibility labels for certain items,
you can pass an array of objects containing these optional fields as well. For example:

\`\`\`jsx
export const ParentComponent = () => {
  const [selectedItems, setSelectedItems] = useState([])

  const onSelectionChange = (updatedItems) => setSelectedItems(updatedItems)

  const items = [
   { text: 'Minnesota', value: 'MN' },
   { text: 'California', value: 'CA' },
   { text: 'New Jersey', value: 'NJ' },
   { text: 'Washington D.C.', value: 'DC', a11yLabel: 'District of Columbia' },
  ]

  return (
    <CheckboxGroup
      items={items}
      onSelectionChange={onSelectionChange}
    />
  )

}
\`\`\``,displayName:"CheckboxGroup",props:{error:{defaultValue:null,description:"Optional error text. If present, applies error styling to element",name:"error",required:!1,type:{name:"StringOrTextWithA11y"}},header:{defaultValue:null,description:"Header text",name:"header",required:!1,type:{name:"StringOrTextWithA11y"}},hint:{defaultValue:null,description:"Hint text. Appears below header",name:"hint",required:!1,type:{name:"StringOrTextWithA11y"}},required:{defaultValue:null,description:"True to append (*Required) suffix to element",name:"required",required:!1,type:{name:"boolean"}},testID:{defaultValue:null,description:"Optional TestID",name:"testID",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"Array of checkbox options. Can be an array containing strings or objects if values or a11y overrides are needed",name:"items",required:!0,type:{name:"string[] | TextWithA11yAndValue[]"}},onSelectionChange:{defaultValue:null,description:"Callback function that receives an updated array of selected values when checkboxes are pressed",name:"onSelectionChange",required:!0,type:{name:"(selected: (string | number)[]) => void"}},selectedItems:{defaultValue:null,description:"Array of the labels or values (if provided) of currently selected checkboxes",name:"selectedItems",required:!0,type:{name:"(string | number)[]"}},tile:{defaultValue:null,description:"True to apply tile styling",name:"tile",required:!1,type:{name:"boolean"}}}}}catch{}const ae={title:"Checkbox group",component:m},C=n=>{const{error:r,header:o,hint:a,items:i,required:c,tile:h}=n,[x,f]=E.useState([]);return e.jsx(m,{items:i,selectedItems:x,error:r,header:o,hint:a,onSelectionChange:b=>f(b),required:c,tile:h})},G=[{text:"Option 1",description:"Description for option 1"},{text:"Option 2",a11yLabel:"Accessibility override for option 2",value:"2",description:{text:"Description for option 2",a11yLabel:"Accessibility override for description"}},{text:"Option 3"},{text:"Option 4"},{text:"Option 5"},{text:"Option 6"}],$=["Option 1","Option 2","Option 3","Option 4"],S="Header",v={text:"Hint text",a11yLabel:"Accessibility override for hint"},K={text:"Error text"},d={render:C,args:{header:S,hint:v,items:G,required:!0}},p={render:C,args:{header:S,hint:v,items:$,tile:!0}},u={render:C,args:{error:K,header:S,hint:v,items:G,required:!0}};var _,j,O;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    items,
    required: true
  }
}`,...(O=(j=d.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var q,w,A;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    header,
    hint,
    items: simpleItems,
    tile: true
  }
}`,...(A=(w=p.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var D,V,T;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: statefulComponentRenderer,
  args: {
    error,
    header,
    hint,
    items,
    required: true
  }
}`,...(T=(V=u.parameters)==null?void 0:V.docs)==null?void 0:T.source}}};const ie=["_Default","__Tile","___Error"];export{d as _Default,p as __Tile,u as ___Error,ie as __namedExportsOrder,ae as default};
