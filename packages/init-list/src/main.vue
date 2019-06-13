<template>
	<div class='dlj-list'>
		<el-breadcrumb class='margin-bottom' separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">
                首页
            </el-breadcrumb-item>
            <template v-if="breads && breads.length">
            	<el-breadcrumb-item v-for="(bread, $index) in breads" :key="$index" :to="{ path: path}">{{bread.title}}</el-breadcrumb-item>
            </template>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='searchArea'>
        	<div ref='dljForm' class='formArea' :style='`height: ${height === "100%" ? "auto" : height + "px"}`'>
	        	<el-form inline :label-width="`${labelWidth}px`" label-position="right">
					<el-form-item v-for="(form, index) in forms" :key="index" :label="form.labelType === 'string' || !form.labelType ? form.label : ''">
						<template v-if="form.labelType === 'html'">
							<el-select
								slot='label'
								v-model="params[form.labelValue]"
							>
								<el-option 
									v-for="(option, optionIndex) in form.labelOptions" 
									:key="optionIndex"
									:label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option"
									:value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
								></el-option>
							</el-select>
						</template>
						<el-input
						 	v-if="form.type==='input' || (primaryType === 'input' && !form.type)" 
						 	v-model="params[form.value]" 
						 	:style="`width: ${formItemWidth}`"
						 	:palceholder="form.palceholder"
						 >
						</el-input>
						<el-date-picker
							v-else-if="form.type==='date' || (primaryType === 'date' && !form.type)"
							v-model="params[form.value]"
							:style="`width: ${formItemWidth}`"
						 	:palceholder="form.palceholder"
						 	:format="form.format || 'yyyy-MM-dd HH:mm:ss'"
						 	:value-format="form.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
						 	:type="form.dateType || 'datetime'"
						 	:picker-options="form.pickerOptions || {}"
						 	@change="date => form.change && form.change(date)"
						>
						</el-date-picker>
						<template v-else-if="form.type==='daterange' || (primaryType === 'daterange' && !form.type)">
							<el-date-picker
								v-model="params[form.value[0]]"
								:style="`width: ${formItemWidth}`"
							 	:palceholder="form.palceholder"
							 	:format="form.format || 'yyyy-MM-dd HH:mm:ss'"
							 	:value-format="form.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
							 	:type="form.dateType || 'datetime'"
							 	:picker-options="form.pickerOptions || {}"
							 	@change="date => form.changeStart && form.changeStart(date)"
							>
							</el-date-picker>
							<span> ~ </span>
							<el-date-picker
								v-model="params[form.value[1]]"
								:style="`width: ${formItemWidth}`"
							 	:palceholder="form.palceholder"
							 	:format="form.format || 'yyyy-MM-dd HH:mm:ss'"
							 	:value-format="form.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
							 	:type="form.dateType || 'datetime'"
							 	:picker-options="form.pickerOptions || {}"
							 	@change="date => form.changeEnd && form.changeEnd(date)"
							>
							</el-date-picker>
						</template>
						<el-select
							v-else-if="form.type === 'select' || (primaryType === 'select' && !form.type)"
							clearable
							filterable
							v-model="params[form.value]"
							:style="`width: ${formItemWidth}`"
						 	:palceholder="form.palceholder"

						>
							<el-option 
								v-for="(option, optionIndex) in form.options" 
								:key="optionIndex"
								:label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option"
								:value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
							></el-option>
						</el-select>
						 <template v-else-if="form.type === 'multiple' || (primaryType === 'multiple' && !form.type)">
							 <template v-for='(item, $ind) in form.items'>
								<el-input
							 	:key="$ind"
							 	v-if="item.type==='input'" 
							 	v-model="params[item.value]" 
							 	:style="`width: ${formItemWidth}`"
							 	:palceholder="item.palceholder"
							 ></el-input>
							 <span :key="$ind" v-else-if="item.type==='span'"> ~ </span>
							 <el-select
							 	:key="$ind"
								v-else-if="item.type === 'select'"
								clearable
								filterable
								v-model="params[item.value]"
								:style="`width: ${formItemWidth}`"
							 	:palceholder="item.palceholder"

							>
								<el-option 
									v-for="(option, optionIndex) in item.options" 
									:key="optionIndex"
									:label="(typeof option === 'object') ? option[item.labelKey || 'label'] : option"
									:value="(typeof option === 'object') ? option[item.valueKey || 'value'] : option"
								></el-option>
							</el-select>
							<el-date-picker
								:key="$ind"
								v-else-if="item.type==='date'"
								v-model="params[item.value]"
								:style="`width: ${formItemWidth}`"
							 	:palceholder="item.palceholder"
							 	:format="item.format || 'yyyy-MM-dd HH:mm:ss'"
							 	:value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
							 	:type="item.dateType || 'datetime'"
							 	:picker-options="item.pickerOptions || {}"
							 	@change="date => item.change && item.change(date)"
							>
							</el-date-picker>
							</template>
						</template>
					</el-form-item>
				</el-form>
        	</div>
			<div class='dlj-searchBtn-area'>
				<div v-if='flod > -1' class='more'>
                    <a v-if='flod' type='primary' @click="change">更多<i class='el-icon-arrow-down el-icon--right'></i></a>
                    <a v-else type='primary' @click="change">收起<i class='el-icon-arrow-up el-icon--right'></i></a>
                </div>
				<div>
					<el-button type='primary' @click="search">查询</el-button>
					<el-button type='primary' v-for='btn in searchBtns' :key="btn.name" @click="btn.click(params)">{{btn.name}}</el-button>
				</div>
			</div>
        </div>
		<div class='margin-top' v-if='globalBtns && globalBtns.length'>
			<el-button type='primary' v-for='btn in globalBtns' :key="btn.name" @click="btn.click">{{btn.name}}</el-button>
		</div>
		<div class='tableArea margin-top'>
			<el-table v-loading="loading" tooltip-effect="dark" border highlight-current-row :data='list' height="100%" @selection-change="handleSelectionChange">
				<template v-for="(item, $index) in cols">
						<el-table-column
	                        align="center"
	                        v-if="item.select"
	                        :prop="item.prop"
	                        type="selection"
	                        :fixed="item.fixed"
	                        :min-width="`${item.width}px`"
	                        :label="item.label"
	                        :key="$index">
	                    </el-table-column>
	                    <el-table-column
	                        align="center"
	                        v-else-if="item.expand"
	                        type="expand"
	                        :key="$index">
	                        <template slot-scope="props">
	                            <slot name='expand' :data="props.row"></slot>
	                        </template>
	                    </el-table-column>
	                    <el-table-column
	                    	align="center"
	                        v-else-if="item.href"
	                        :prop="item.prop"
	                        :label="item.label || '操作'"
	                        :fixed="item.fixed"
	                        :min-width="`${item.width}px`"
	                        :key="$index"
	                    >
	                    	<template slot-scope='scope'>
	                    		<span @click='item.href(scope.row)'>{{scope.row[item.prop]}} <i class='el-icon-view'></i></span>
	                    	</template>
	                    </el-table-column>
	                    <el-table-column
	                        align="center"
	                        v-else-if="item.btns&&item.btns.length"
	                        :prop="item.prop"
	                        :label="item.label || '操作'"
	                        :fixed="item.fixed"
	                        :min-width="`${item.width}px`"
	                        :key="$index">
	                        <template slot-scope="scope">
					            <el-button 
					            	v-for="(btn, index) of item.btns"
			                        :key="index"
			                        plain
			                        :disabled="btn.disabled && btn.disabled(scope.row)"
			                        @click="btn.callback(scope.row)"
			                        :type="btn.type || 'primary'">
			                    	{{btn.name}}
			                	</el-button>
			                </template>
	                    </el-table-column>
	                    <el-table-column v-else-if="item.img"
	                        :key="$index"
	                        :fixed="item.fixed"
	                        :label="item.label"
	                        align="center"
	                        :prop='item.prop'
	                        :width="item.width">
					        <template slot-scope="scope">
					        <img v-for="(src,index) of scope.row[item.prop] || []" :key="index" :src="src" width="100px;height:100px;">
					        </template>
					    </el-table-column>
					    <el-table-column
					    	v-else-if='item.html'
					    	:key="$index"
	                        :fixed="item.fixed"
	                        :label="item.label"
	                        align="center"
	                        :prop='item.prop'
	                        :width="item.width"
					    >
					    	<template slot-scope='scope'>
					    		<slot  :item='scope.row' :label='item' :value='scope.row[item.prop]'></slot>
					    	</template>
					    </el-table-column>
					    <el-table-column
					    	v-else-if='item.inner'
					    	:key='$index'
					    	:fixed="item.fixed"
	                        :label="item.label"
	                        align="center"
	                        :prop='item.prop'
	                        :width="item.width"
					    >
					    	<template slot-scope='scope'>
					    		<span v-html='item.innerHtml'></span>
					    	</template>
					    </el-table-column>
					    <el-table-column
							v-else-if='item.filter'
					    	:key='$index'
					    	:fixed="item.fixed"
	                        :label="item.label"
	                        align="center"
	                        :prop='item.prop'
	                        :width="item.width"
					    >
					    	<template slot-scope="scope">
					    		<span>{{scope.row[item.prop] ? item.filter(scope.row, item.prop) : ''}}</span>
					    	</template>
					    </el-table-column>
	                    <el-table-column
	                        align="center"
	                        v-else
	                        :fixed="item.fixed"
	                        :prop="item.prop"
	                        :label="item.label"
	                        :sortable="item.sortable"
	                        :min-width="`${item.width}px`"
	                        :key="$index">
	                    </el-table-column>
	            </template>
			</el-table>
		</div>
		<div class='tableBtns' v-if='tableBtns && tableBtns.length'>
			<el-button type='primary' v-for='btn in tableBtns' :key="btn.name" @click="btn.click(selected)">{{btn.name}}</el-button>
		</div>
		<el-pagination 
			@current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="page"
            layout="total, sizes, prev, pager, next, jumper"
            background
            :page-sizes="sizes"
            :page-size="size"
            :total="total">
      </el-pagination>
	</div>
</template>
<script>
import { props } from './props';
export default {
	name: "InitList",
	props: props,
	data () {
		const { forms, pageSizeKey, pageStartKey, defaultparams } = this.$props;
		return {
			formItemWidth: '204px',
			params: defaultparams,
			loading: false,
			sizes: [10, 50, 100, 200],
			size: 10,
			page: 1,
			flod: -1,
            height: '100%',
            selected: [],
            haveForm: false
		}

	},
	watch: {
		forms: {
			handler: function(val) {
				if(val && val.length) {
					this.haveForm = false;
					let params = this.params;
					val.forEach(form => {
						const valueType = typeof form.value;
						if (form.labelType === 'html') {
							params[form.labelValue] = form.defaultLabelVal ? form.defaultLabelVal : '';
						}
						if (valueType === 'string') {
							params[form.value] = form.defaultVal ? form.defaultVal : '';
						} else {
							// console.log(form.value, 'formformform')
							form.value.forEach(v => {
								params[v] = '';
							});
						}
					});
					this.haveForm = true;
					this.$nextTick(() => {
						if(this.$refs.dljForm.offsetHeight <= 66) { 
			                this.height = '100%';
			                this.flod = -1;
			            } else {
			                this.height = '66';
			                this.flod = 1;
			            }
					});
				}
			},
			deep: true
		}
	},
	methods: {
		handleSelectionChange(val) {
			this.selected = val;
		},
		change() {
            if(this.height === '66') {
                this.height = '100%';
            } else if(this.height === '100%') {
                this.height = '66';
            }
            this.flod = !this.flod * 1;
        },
		async search() {
			if(this.loading) return;
			this.loading = true;
			let res = await this.$emit('getTest', this.params);
			this.loading = false;
		},
		reset() {
			// console.log('reset');
		},
		handleCurrentChange(val) {
			this.page = val;
			this.params[this.pageStartKey] = val;
	      	this.$emit("getTest", this.params);
	    },
	    handleSizeChange(val) {
	    	this.size = val;
	    	this.params[this.pageSizeKey] = val;
	      	this.$emit("getTest", this.params);
	    }
	}
}
</script>
<style lang='less' scoped>
@import '../../styles/common.less';
@import '../../styles/init-list.less';
</style>
