	/**********************************************************
	完成各种动态交互
	**********************************************************/
	
	
	var listYear = document.getElementById('listyear');//年代列表
	var listMonth = document.getElementById('listmonth');//月份列表
	var titleYear = document.getElementById('titleyear');//年选择器
	var titleMonth = document.getElementById('titlemonth');//月选择器
	/**********************************************************
	初始化
	**********************************************************/
	function init(){
		var date = new Date();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var rest = calRest(year,month);
		var index = 6 + rest + date.getDate();
		titleYear.textContent = year + '月';
		titleMonth.textContent = month + '月';
		updateCalendar();
		updateBoard(index);
		var input = document.getElementById('mobileboardtitle');
		if(month < 10){
			month = '0' + month;
			}
		input.value = year + '-' + month;
		
		}
	/**********************************************************
	年选择器
	**********************************************************/
	function chooseYear(){
		listMonth.style.display = 'none';
		if(listYear.style.display != 'block'){
			listYear.style.display = 'block';
		}else{		
			listYear.style.display = 'none';
		}
	}
	/**********************************************************
	月选择器
	**********************************************************/
	function chooseMonth(){
		listYear.style.display = 'none';
		if(listMonth.style.display != 'block'){
			listMonth.style.display = 'block';
		}else{		
			listMonth.style.display = 'none';
		}
	}
	/**********************************************************
	选择某年
	**********************************************************/
	function selectYear(e){
		e.stopPropagation();
		listYear.style.display = 'none';
		listMonth.style.display = 'none';
		var year = parseInt(e.target.textContent);
		titleYear.textContent = year + '年';
		updateCalendar();
	}
	/**********************************************************
	选择某月
	**********************************************************/
	function selectMonth(e){
		e.stopPropagation();
		listYear.style.display = 'none';
		listMonth.style.display = 'none';
		e.currentTarget.style.display = 'none';
		var month = parseInt(e.target.textContent);
		var chooseMonth = document.getElementById('choosemonth');
		titleMonth.textContent = month + '月';
		updateCalendar();
		}
	/**********************************************************
	下个月
	**********************************************************/
	function nextMonth(e){
		e.stopPropagation();
		var year = parseInt(titleYear.textContent);
		var month = parseInt(titleMonth.textContent);
		if(month == 12){
			year = year + 1;
			month = 1;	
			if(year > 2049){
				year = 2049;
				month = 12;
				}
			titleMonth.textContent = month + '月';
			titleYear.textContent = year + '年';
		}else{
			month = month + 1;
			titleMonth.textContent = month + '月';
			titleYear.textContent = year + '年';
			}
		updateCalendar();
		}
	/**********************************************************
	上个月
	**********************************************************/
	function lastMonth(e){
		e.stopPropagation();
		var year = parseInt(titleYear.textContent);
		var month = parseInt(titleMonth.textContent);
		if(month == 1){
			year = year - 1;
			month = 12;	
			if(year < 1901){
				year = 1901;
				month = 1;
				}
			titleMonth.textContent = month + '月';
			titleYear.textContent = year + '年';
		}else{
			month = month - 1;
			titleMonth.textContent = month + '月';
			titleYear.textContent = year + '年';
			}
		updateCalendar();
		}
	/**********************************************************
	回到当日
	**********************************************************/
	function backToday(){
		listYear.style.display = 'none';
		listMonth.style.display = 'none';
		var _date = new Date();
		titleYear.textContent = _date.getFullYear() + '年';
		titleMonth.textContent = _date.getMonth() + 1;
		updateCalendar();
		}
	/**********************************************************
	更新万年历
	**********************************************************/
	function updateCalendar(){//month:1~12
		var year = parseInt(titleYear.textContent);
		var month = parseInt(titleMonth.textContent);
		var row = calRow(year,month);
		var date = calStartDate(year,month);
		console.log(date);
		render(date,row,month);
		}
		
	/**********************************************************
	选择某一天
	**********************************************************/
	function clickDay(e){
		if(lastClick != null){
			var cookie = {};
			var cookies = document.cookie;
			if(cookies!=null){
				classValue = cookies.substr(10);
				}
			lastClick.parentNode.setAttribute("class",classValue);

			}
		var target;
		if(e.target.nodeName != 'TD'){
			target = e.target.parentNode.lastChild;
		}else{
			target = e.target.lastChild;
			}
		var index = target.textContent;
		if(index >= 7){//第一个日期是
			document.cookie = "className" + "=" + target.parentNode.getAttribute("class");
			target.parentNode.setAttribute("class","clickedtd");
			lastClick = target;
			updateBoard(index);
		}
	}
	
	/**********************************************************
	更新右边面板
	**********************************************************/
	
	function updateBoard(index){
		var obj = dateArr[index];
		var boardTitle = document.getElementById('boardtitle');
		var bigDate = document.getElementById('bigdate');
		var lunarDate = document.getElementById('lunardate');
		var lunarYear = document.getElementById('lunaryear');
		boardTitle.textContent = obj.solar.year+'-'+obj.solar.month+'-'+obj.solar.date+' '+obj.weekDay;
		bigDate.textContent = obj.solar.date;
		lunarDate.textContent = obj.lunar.monthArr+obj.lunar.dateArr;
		lunarYear.textContent = obj.ganzhi+' 【'+obj.animal+'】';
		}
		
		
		
	/**********************************************************
	移动端选择年月
	**********************************************************/

	function mobileop(){
		var input = document.getElementById('mobileboardtitle');
		var datestr = input.value.split('-');
		var month = datestr[1];
		var year = datestr[0];
		titleYear.textContent = year + '月';
		titleMonth.textContent = month + '月';
		updateCalendar();
		}