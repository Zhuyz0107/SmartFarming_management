package com.zyz.product_message.exception;


import com.zyz.product_message.result.ResultCode;

/**
 * 自定义service层异常类
 */
public class ServiceException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private ResultCode resultCode;

    public ServiceException(ResultCode resultCode) {
        this(resultCode.message());
        this.resultCode = resultCode;
    }

    private ServiceException(String message) {
        super(message);
    }

    public ResultCode getResultCode() {
        return resultCode;
    }

    public void setResultCode(ResultCode resultCode) {
        this.resultCode = resultCode;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}
