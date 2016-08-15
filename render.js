	/**********************************************************
	渲染整个万年历
	
	**********************************************************/
	
	
	
	dateArr = [];//当前万年历中所有的日期对象的数组
	
	/**********************************************************
	主要渲染函数
	
	**********************************************************/
	function render(date,row,_thisMonth){
		_thisYear = date.getFullYear();
	/*渲染并定位年份滚动条————1901~2049*/
		var listYear = document.getElementById('listyear');
		_ul = document.createElement('ul');
		for(i = 1901; i< 2050; i++){
			_li = document.createElement('li');
			_li.textContent = i;
			if(i == _thisYear){
				_li.setAttribute('class','currentyear');
				}
			_ul.appendChild(_li);
			}
		listYear.appendChild(_ul);
		
	/*渲染并定月年份滚动条*/
		var listMonth = document.getElementById('listmonth');
		_ul = document.createElement('ul');
		for(i = 1; i< 13; i++){
			_li = document.createElement('li');
			_li.textContent = i+'月';
			if(i == _thisMonth){
				_li.setAttribute('class','currentmonth');
				}
			_ul.appendChild(_li);
			}
		listMonth.appendChild(_ul);
		
		
	/*渲染日期部分*/	
		var table = document.getElementById('calendar');
		table.textContent = "";	
		var index = 0;
		var rows = [];
		var cells = [];
		var _year = date.getFullYear();
		var _month = date.getMonth();
		var _date = date.getDate();
		var _height = 15;
		var _width = 10;
		if(row == 6){
			_height = 13.66;
			}
		rows[0] = table.insertRow(0);
		
		
		for(var i = 0; i < 7; i++){//添加星期
			cells[index] = rows[0].insertCell(i);
			
			cells[index].innerHTML = weekstr[i];//核心代码！！！
			
			if(i == 5 || i == 6){
				cells[index].setAttribute('class','weektitle week weekend');
			}else{
				cells[index].setAttribute('class','weektitle week');
			}
			
			index++;
		}
		for(var i = 1; i　< row+1; i++　){//添加日期
			rows[i] = table.insertRow(i);
			for(var j = 0; j < 7; j++){
				var Day = new Date(_year,_month,_date+index-7);
				var renderObj = handleDay(Day);
				dateArr[index] = renderObj;
				cells[index] = rows[i].insertCell(j);
				cells[index].textContent = renderObj.lunar.dateArr;//核心代码！！！
				
				if(renderObj.weekDay == '星期六' || renderObj.weekDay == '星期日'){
					var _html = '<div class="solar weekend">'+renderObj.solar.date+'</div>';
				}else{
					var _html = '<div class="solar">'+renderObj.solar.date+'</div>';
					}
				var _lunar = '';
				var hiddenindex = '<p style="display:none">'+index+'</div>';
				var sw = (window.screen.width);
				if(renderObj.holiday.solar){
					_lunar = renderObj.holiday.solar;
					if(sw > 1000&&_lunar.length>3){_lunar = _lunar.substr(0,2)+"...";}
					if(sw < 1000&&_lunar.length>2){_lunar = _lunar.substr(0,1)+"...";}
					
					_html = _html + '<div class="holiday">'+_lunar+'</div>'+hiddenindex;
				}else if(renderObj.holiday.lunar){
					_lunar = renderObj.holiday.lunar;
					if(sw > 1000&&_lunar.length>3){_lunar = _lunar.substr(0,2)+"...";}
					if(sw < 1000&&_lunar.length>2){_lunar = _lunar.substr(0,1)+"...";}
					_html = _html + '<div class="holiday">'+_lunar+'</div>'+hiddenindex;
				}else if(renderObj.term){
					_lunar = renderObj.term;
					if(sw > 1000&&_lunar.length>3){_lunar = _lunar.substr(0,2)+"...";}
					if(sw < 1000&&_lunar.length>2){_lunar = _lunar.substr(0,1)+"...";}
					_html = _html + '<div class="holiday">'+_lunar+'</div>'+hiddenindex;
				}else {
					_lunar = renderObj.lunar.dateArr;
					if(sw > 1000&&_lunar.length>3){_lunar = _lunar.substr(0,2)+"...";}
					if(sw < 1000&&_lunar.length>2){_lunar = _lunar.substr(0,1)+"...";}
					_html = _html + '<div class="lunar">'+_lunar+'</div>'+hiddenindex;
					}
				
				cells[index].innerHTML = _html;
				
				cells[index].setAttribute('class','calendarday');
				if(Day.getDate() == new Date().getDate()&&Day.getFullYear() == new Date().getFullYear()&&Day.getMonth() == new Date().getMonth()){
					cells[index].setAttribute('class','calendarday today');
					}
				if(renderObj.solar.month != _thisMonth){
					cells[index].setAttribute('class','notthismon');
				}
				cells[index].style.height = _height + '%';
				index++;
				}
			}
	}
	/**********************************************************
	给定一个日期，计算显示页面的第一个日期
	
	**********************************************************/
	function calStartDate(year,month){
		var rest = calRest(year,month);
		var date = new Date(year,month-1,1-rest);
		return date;
		}
	/**********************************************************
	计算上个月剩了几天
	
	**********************************************************/
	function calRest(year,month){					
		var thisFirstDay = new Date(year,month-1,1);
		var rest = thisFirstDay.getDay();
		if(rest == 0){
			rest = 6;
			return rest;
		}else{
			rest = rest - 1;
			return rest;
		}
	}
	/**********************************************************
	当前万年历共有几行
	
	**********************************************************/
	calRow(1901,6);
	
	function calRow(year,month){
		var rows = 5;
		var rest = calRest(year,month);
		var thisMonNum = calMonNum(year,month);
		if(rest+thisMonNum > 35){
			rows = 6;
			}
		return rows;		
	}
	/**********************************************************
	该年该月多少天
	
	**********************************************************/
	
	function calMonNum(year,month){   
		var date = new Date(year,month-1,1);
		var year = date.getFullYear();
		var month = date.getMonth();
		var thisMon = new Date(year,month,1).getMonth();
		if(new Date(year,month-1,31).getMonth() == thisMon){
			return 31;
			}else if(new Date(year,month-1,30).getMonth() == thisMon){
				return 30;
			}else if(new Date(year,month-1,29).getMonth() == thisMon){
				return 29;
			}else if(new Date(year,month-1,28).getMonth() == thisMon){
				return 28;
			}
	}