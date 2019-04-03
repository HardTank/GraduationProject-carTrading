package com.carTrading.entity;

/**
 * @author tanlixin
 * @description
 * @since 2019-04-02
 */
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import java.io.Serializable;
import java.util.Collections;
import java.util.List;

public class Page<T> implements Serializable {
    private static final long serialVersionUID = 3509375972998939764L;
    public static String CURRENT_INDEX = "currentIndex";
    public static String PAGE_SIZE = "pageSize";
    public static String INDEX = "index";
    private int currentIndex;
    private int pageSize;
    private int totalNumber;
    private int totalPage;
    private int nextIndex;
    private int preIndex;
    private List<T> Items = Collections.emptyList();

    public int getPageSize() {
        return this.pageSize;
    }

    public Page(int totalNumber, int currentIndex, int pageSize, List<T> items) {
        this.totalNumber = totalNumber;
        this.currentIndex = currentIndex;
        this.pageSize = pageSize;
        this.Items = items;
    }

    public Page() {
        this.totalNumber = 0;
        this.currentIndex = 1;
        this.pageSize = 10;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getCurrentIndex() {
        return this.currentIndex;
    }

    public void setCurrentIndex(int currentIndex) {
        this.currentIndex = currentIndex;
    }

    public int getTotalNumber() {
        return this.totalNumber;
    }

    public void setTotalNumber(int totalNumber) {
        this.totalNumber = totalNumber;
    }

    public int getTotalPage() {
        int size = this.totalNumber / this.pageSize;
        if(this.totalNumber % this.pageSize != 0) {
            ++size;
        }

        this.totalPage = size;
        return this.totalPage;
    }

    public int getNextIndex() {
        if(this.currentIndex >= this.getTotalPage()) {
            this.nextIndex = this.currentIndex;
        } else {
            this.nextIndex = this.currentIndex + 1;
        }

        return this.nextIndex;
    }

    public int getPreIndex() {
        if(this.currentIndex <= 1) {
            this.preIndex = 0;
        } else {
            this.preIndex = this.currentIndex - 1;
        }

        return this.preIndex;
    }

    public List<T> getItems() {
        return this.Items;
    }

    public void setItems(List<T> items) {
        this.Items = items;
    }

    public String replaceUrl(String url, int page) {
        return url != null && url.indexOf("?") == -1?url + "?" + INDEX + "=" + page:(url != null && url.indexOf("index=") == -1?url + "&" + INDEX + "=" + page:(url == null?"":url.replaceAll("index=\\d{1,}", INDEX + "=" + page)));
    }

    public String getPageHtml(String linkUrl) {
        int totalPage = this.getTotalPage();
        StringBuffer str = new StringBuffer("");
        str.append("<div class=\"sort clearfix\">");
        if(this.currentIndex == 1) {
            str.append("<a  click_type=\"page-prev\" class=\"pre\">上一页</a>");
        } else {
            str.append("<a click_type=\"page-prev\" class=\"pre\" href=\"" + this.replaceUrl(linkUrl, this.currentIndex - 1) + "\">上一页</a>");
        }

        int preDiff;
        if(totalPage <= 7) {
            for(preDiff = 1; preDiff <= totalPage; ++preDiff) {
                if(preDiff == this.currentIndex) {
                    str.append("<a class=\"activeNumber\">" + preDiff + "</a>");
                } else {
                    str.append("<a click_type=\"page-number-" + preDiff + "\" href=\"").append(this.replaceUrl(linkUrl, preDiff) + "\">" + preDiff + "</a>");
                }
            }
        }

        if(totalPage > 7) {
            if(this.currentIndex < 6) {
                for(preDiff = 1; preDiff <= 6; ++preDiff) {
                    if(preDiff == this.currentIndex) {
                        str.append("<a click_type=\"page-number-" + preDiff + "\" class=\"activeNumber\" href=\"").append(this.replaceUrl(linkUrl, preDiff) + "\" >" + preDiff + "</a>");
                    } else {
                        str.append("<a click_type=\"page-number-" + preDiff + "\" href=\"").append(this.replaceUrl(linkUrl, preDiff) + "\" >" + preDiff + "</a>");
                    }
                }

                str.append("<span>...</span>");
                str.append("<a click_type=\"page-number-" + totalPage + "\" href=\"").append(this.replaceUrl(linkUrl, totalPage) + "\" >" + totalPage + "</a>");
            } else {
                preDiff = this.currentIndex;
                int nextDiff = totalPage - this.currentIndex;
                int i;
                if(preDiff <= 4) {
                    for(i = 1; i < preDiff; ++i) {
                        str.append("<a click_type=\"page-number-" + i + "\" href=\"").append(this.replaceUrl(linkUrl, i) + "\" >" + i + "</a>");
                    }
                }

                if(preDiff > 4) {
                    str.append("<a click_type=\"page-number-1\" href=\"").append(this.replaceUrl(linkUrl, 1) + "\" >1</a>");
                    str.append("<span>...</span>");

                    for(i = this.currentIndex - 2; i < this.currentIndex; ++i) {
                        str.append("<a click_type=\"page-number-" + i + "\" href=\"").append(this.replaceUrl(linkUrl, i) + "\"").append(">" + i + "</a>");
                    }
                }

                str.append("<a class=\"activeNumber\">" + this.currentIndex + "</a>");
                if(nextDiff <= 3) {
                    for(i = this.currentIndex + 1; i <= totalPage; ++i) {
                        str.append("<a click_type=\"page-number-" + i + "\" href=\"").append(this.replaceUrl(linkUrl, i) + "\" >" + i + "</a>");
                    }
                }

                if(nextDiff > 3) {
                    for(i = this.currentIndex + 1; i <= this.currentIndex + 2; ++i) {
                        str.append("<a click_type=\"page-number-" + i + "\" href=\"").append(this.replaceUrl(linkUrl, i) + "\" >" + i + "</a>");
                    }

                    str.append("<span>...</span>");
                    str.append("<a click_type=\"page-number-" + totalPage + "\" href=\"").append(this.replaceUrl(linkUrl, totalPage) + "\" >" + totalPage + "</a>");
                }
            }
        }

        if(this.currentIndex == totalPage) {
            str.append("<a click_type=\"page-next\" class=\"next\">下一页</a>");
        } else {
            str.append("<a click_type=\"page-next\" class=\"next\" href=\"" + this.replaceUrl(linkUrl, this.currentIndex + 1) + "\">下一页</a>");
        }

        str.append("</div>");
        return str.toString();
    }

    public String getNewPageHtml(String linkUrl) {
        int totalPage = this.getTotalPage();
        StringBuffer str = new StringBuffer("");
        str.append("<div class=\"pagination\">");
        str.append("<ul>");
        if(this.currentIndex == 1) {
            str.append("<li><a>«</a></li>");
        } else {
            str.append("<li><a href=\"" + this.replaceUrl(linkUrl, this.currentIndex - 1) + "\">«</a></li>");
        }

        int preDiff;
        if(totalPage <= 7) {
            for(preDiff = 1; preDiff <= totalPage; ++preDiff) {
                if(preDiff == this.currentIndex) {
                    str.append("<li class=\"active\"><a>" + preDiff + "</a></li>");
                } else {
                    str.append("<li><a href=\"").append(this.replaceUrl(linkUrl, preDiff) + "\">" + preDiff + "</a></li>");
                }
            }
        }

        if(totalPage > 7) {
            if(this.currentIndex < 6) {
                for(preDiff = 1; preDiff <= 6; ++preDiff) {
                    if(preDiff == this.currentIndex) {
                        str.append("<li class=\"active\"><a href=\"").append(this.replaceUrl(linkUrl, preDiff) + "\" >" + preDiff + "</a></li>");
                    } else {
                        str.append("<li><a  href=\"").append(this.replaceUrl(linkUrl, preDiff) + "\" >" + preDiff + "</a></li>");
                    }
                }

                str.append("<li><a>...</a></li>");
                str.append("<li><a href=\"").append(this.replaceUrl(linkUrl, totalPage) + "\" >" + totalPage + "</a></li>");
            } else {
                preDiff = this.currentIndex;
                int nextDiff = totalPage - this.currentIndex;
                int i;
                if(preDiff <= 4) {
                    for(i = 1; i < preDiff; ++i) {
                        str.append("<li><a href=\"").append(this.replaceUrl(linkUrl, i) + "\" >" + i + "</a></li>");
                    }
                }

                if(preDiff > 4) {
                    str.append("<li><a href=\"").append(this.replaceUrl(linkUrl, 1) + "\" >1</a></li>");
                    str.append("<li><a>...</a></li>");

                    for(i = this.currentIndex - 2; i < this.currentIndex; ++i) {
                        str.append("<li><a href=\"").append(this.replaceUrl(linkUrl, i) + "\"").append(">" + i + "</a></li>");
                    }
                }

                str.append("<li class=\"active\"><a>" + this.currentIndex + "</a></li>");
                if(nextDiff <= 3) {
                    for(i = this.currentIndex + 1; i <= totalPage; ++i) {
                        str.append("<li><a href=\"").append(this.replaceUrl(linkUrl, i) + "\" >" + i + "</a></li>");
                    }
                }

                if(nextDiff > 3) {
                    for(i = this.currentIndex + 1; i <= this.currentIndex + 2; ++i) {
                        str.append("<li><a href=\"").append(this.replaceUrl(linkUrl, i) + "\" >" + i + "</a></li>");
                    }

                    str.append("<li><a>...</a></li>");
                    str.append("<li><a  href=\"").append(this.replaceUrl(linkUrl, totalPage) + "\" >" + totalPage + "</a></li>");
                }
            }
        }

        if(this.currentIndex == totalPage) {
            str.append("<li><a >»</a></li>");
        } else {
            str.append("<li><a href=\"" + this.replaceUrl(linkUrl, this.currentIndex + 1) + "\">»</a></li>");
        }

        str.append("</ul>");
        str.append("</div>");
        return str.toString();
    }

    public Page<?> transform(Function<T, ?> function) {
        List thatItem = Lists.transform(this.Items, function);
        Page newPage = new Page(this.getTotalNumber(), this.getCurrentIndex(), this.getPageSize(), thatItem);
        return newPage;
    }
}

