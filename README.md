# el-element-components

> The plugin is an extension of element-ui and also for code reuse. On the basis of Vue 2.x.

> You can refer to this plug-in in your project, mainly including: 1. List with search criteria; 2. Area headings

## Install

```
$ npm i --save element-ui-components
```
## API

## Quick Start

Import modules and set up settings in `main.js`:

```js
import Vue from 'vue'
import { InitList, InitTitle } from 'element-ui-components'

Vue.use(InitList)
Vue.use(InitTitle)
```

And the Test page is the image above.

> Use this package to show **local** data in a page:


## InitList
> This is a list page with breadcrumbs, filters, global buttons, tables and pages.
The entire page spacing is a multiple of 8.

#### props
**breads:** Your routing table with path and title.
**title:** The title of your page will be used for the last breadcrumb.
**primaryType:** The main types of filters on your page,default is 'input'.
**labelWidth:** The label width of the filter items on your page,default is '145',if you want to set other values,please set them.



**defaultparams:** Please give me your page's default params for get list data.
**searchBtns:** If you have some buttons with functions other than search, please give them to me in the form of arrays. It contains 'name' and 'click' parameters, and params will be passed as parameters.
**globalBtns:** This is a set of global buttons on your page. It also have 'name' and 'click' parameters.
**cols:** On your page, you need to provide different types of columns for tables. We have provided you with different types of columns, you just need to set them up. normal params have prop, fixed, width, label and so on. If you set **'select: true'**, this column will provide multiple checkboxs for you to manipulate table items. And set **'expand: true'**, this column will provide extended tables for you. and so on. There will be pictures, filters, custom code snippets in your table.
**list:** Table data.
**total:** Total table data
**pageSizeKey:** How much data per page that you request the interface to provide to the interface is the parameter name.
**pageStartKey:** You request the parametre name of the page number that the interface provides to the interface.
**tableBtns:** If you have the need to manipulate the table, we provide you with a set of buttons for you to manipulate.



	forms: {
		type: Array
	},
	
## InitTitle
> dd

## LICENSE

MIT
