package com.hengyunsoft.platform.exchange.entity.set.po;

import com.hengyunsoft.base.entity.BaseEntity;
import com.hengyunsoft.validator.ValidatorGroups.MustNoneNull;
import com.hengyunsoft.validator.annotation.FieldDesc;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import java.util.Date;
import javax.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Data
@ApiModel(value = "ShareDataSetDir", description = "")
public class ShareDataSetDir extends BaseEntity<Long> implements Serializable {
    /**
     * 主键
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "主键")
    @FieldDesc("主键")
    @Range(min=Long.MIN_VALUE,max=Long.MAX_VALUE)
    @NotNull(groups=MustNoneNull.class)
    private Long id;

    /**
     * 数据集id
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "数据集id")
    @FieldDesc("数据集id")
    @Range(min=Long.MIN_VALUE,max=Long.MAX_VALUE)
    private Long setId;

    /**
     * 目录id
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "目录id")
    @FieldDesc("目录id")
    @Range(min=Long.MIN_VALUE,max=Long.MAX_VALUE)
    private Long dirId;

    /**
     * 操作类型(最近一次)：1,新增,2，删除,3，正常,
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "操作类型(最近一次)：1,新增,2，删除,3，正常,")
    @FieldDesc("操作类型(最近一次)：1,新增,2，删除,3，正常,")
    @Range(min=Integer.MIN_VALUE,max=Integer.MAX_VALUE)
    private Integer optType;

    /**
     * 创建时间
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "创建时间")
    @FieldDesc("创建时间")
    private Date createTime;

    /**
     * 创建人
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "创建人")
    @FieldDesc("创建人")
    @Range(min=Long.MIN_VALUE,max=Long.MAX_VALUE)
    private Long createUser;

    /**
     * 更新时间
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "更新时间")
    @FieldDesc("更新时间")
    private Date updateTime;

    /**
     * 更新人
     *
     * @mbggenerated
     */
    @ApiModelProperty(value = "更新人")
    @FieldDesc("更新人")
    @Range(min=Long.MIN_VALUE,max=Long.MAX_VALUE)
    private Long updateUser;

    //------------- 手动新增字段，请写在此后面 -------------
    private static final long serialVersionUID = 1L;
}