<template>
	<div>
		<script :id=id type="text/plain"></script>
	</div>
</template>
<script>
	export default {
		name: 'UE',
		data() {
			return {
				editor: null
			}
		},
		props: {
			defaultMsg: {
				type: String
			},
			config: {
				type: Object
			},
			id: {
				type: String
			},
		},
		mounted() {
			const _this = this;
			this.editor = UE.getEditor(this.id, this.config); // 初始化UE
			this.editor.addListener("ready", function() {
				_this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
			});
			UE.registerUI('uploadimg', function(editor, uiName) {
			    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
			    editor.registerCommand(uiName, {
			        execCommand: function() {
			            alert('execCommand:' + uiName)
			        }
			    });
			    //创建一个button
			    var uploadimg = new UE.ui.Button({
			        //按钮的名字
			        name: "uploadimg",
			        //提示
			        title: "图片上传",
			        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
			        cssRules: 'background-position: -380px 0px;',
			        //点击时执行的命令
			        onclick: function() {
			            //这里可以不用执行命令,做你自己的操作也可
			            // editor.execCommand(uiName);
			
			            $("#uploader1 .webuploader-element-invisible").click();
			        }
			    });
			    //当点到编辑内容上时，按钮要做的状态反射
			    editor.addListener('selectionchange', function() {
			        var state = editor.queryCommandState(uiName);
			        if (state == -1) {
			            uploadimg.setDisabled(true);
			            uploadimg.setChecked(false);
			        } else {
			            uploadimg.setDisabled(false);
			            uploadimg.setChecked(state);
			        }
			    });
			    //因为你是添加button,所以需要返回这个button
			    return uploadimg;
			});
			UE.registerUI('uploadfiles', function(editor, uiName) {
			    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
			    editor.registerCommand(uiName, {
			        execCommand: function() {
			            alert('execCommand:' + uiName)
			        }
			    });
			    //创建一个button
			    var uploadfiles = new UE.ui.Button({
			        //按钮的名字
			        name: "uploadfiles",
			        //提示
			        title: "附件上传",
			        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
			        cssRules: 'background-position: -620px -40px;',
			        //点击时执行的命令
			        onclick: function() {
			            //这里可以不用执行命令,做你自己的操作也可
			            // editor.execCommand(uiName);
			            $("#filePicker1 .webuploader-element-invisible").click();
			        }
			    });
			    //当点到编辑内容上时，按钮要做的状态反射
			    editor.addListener('selectionchange', function() {
			        var state = editor.queryCommandState(uiName);
			        if (state == -1) {
			            uploadfiles.setDisabled(true);
			            uploadfiles.setChecked(false);
			        } else {
			            uploadfiles.setDisabled(false);
			            uploadfiles.setChecked(state);
			        }
			    });
			    //因为你是添加button,所以需要返回这个button
			    return uploadfiles;
			});
			UE.getEditor(this.id).addListener('blur',function(editor){
				_this.$emit('editorUpdate',_this.getUEContent());
			});
		},
		methods: {
			getUEContent() { // 获取内容方法
				return this.editor.getContent()
			},
			getUEContentTxt() { // 获取纯文本内容方法
				return this.editor.getContentTxt()
			}
		},
		destroyed() {
			this.editor.destroy();
		}
	}
</script>