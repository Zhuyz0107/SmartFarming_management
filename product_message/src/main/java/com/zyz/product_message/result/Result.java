package com.zyz.product_message.result;

import lombok.Data;

import java.io.Serializable;

/**
 * 统一Controller中RESTFul风格接口返回的结果
 */
@Data
public class Result implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer code;
	private String message;
	private Object data;

	public Result() {}

	public Result(Integer code, String message) {
		this.code = code;
		this.message = message;
	}

	private void setResultCode(ResultCode code) {
		this.code = code.code();
		this.message = code.message();
	}

	/**
	 * 操作成功，没有返回的数据
	 */
	public static Result success() {
		Result result = new Result();
		result.setResultCode(ResultCode.SUCCESS);
		return result;
	}

	/**
	 * 操作成功，有返回的数据
	 */
	public static Result success(Object data) {
		Result result = new Result();
		result.setResultCode(ResultCode.SUCCESS);
		result.setData(data);
		return result;
	}

	/**
	 * 操作失败，没有返回的数据
	 */
	public static Result failure(ResultCode resultCode) {
		Result result = new Result();
		result.setResultCode(resultCode);
		return result;
	}

	/**
	 * 操作失败，有返回的数据
	 */
	public static Result failure(ResultCode resultCode, Object data) {
		Result result = new Result();
		result.setResultCode(resultCode);
		result.setData(data);
		return result;
	}

	/**
	 * 操作失败，自定义code和msg
	 */
	public static Result failure(Integer code, String msg) {
		Result result = new Result(code,msg);
		return result;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}
