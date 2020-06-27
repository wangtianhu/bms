<template>
	<div class="choseHourseId">
		<div class="shequList" style="display: block;">
			<div class="shequListContent">
				<div class="cityList">
					<div class="allBtn">
						<p class="" onclick="choseAllSheQu()">
							全部<i class="layui-icon"></i>
						</p>
					</div>
					<ul class="allCity">
						<!-- <li>上海市<i class="layui-icon">&#xe602;</i></li> -->
						<li
							onclick="choseCitySheQuList('0')"
							class="choseCity-active"
						>
							上海市<i class="layui-icon"></i>
						</li>
						<li onclick="choseCitySheQuList('1')" class="">
							石家庄市<i class="layui-icon"></i>
						</li>
						<li onclick="choseCitySheQuList('2')" class="">
							深圳市<i class="layui-icon"></i>
						</li>
						<li onclick="choseCitySheQuList('3')">
							北京市<i class="layui-icon"></i>
						</li>
						<li onclick="choseCitySheQuList('4')">
							杭州市<i class="layui-icon"></i>
						</li>
						<li onclick="choseCitySheQuList('5')">
							广州市<i class="layui-icon"></i>
						</li>
					</ul>
				</div>
				<div class="allSheQu">
					<div class="serachInput">
						<input
							type="text"
							id="serachSheQu"
							class="layui-input sheQuSerach"
							placeholder="快速搜索社区"
							autocomplete="off"
						/>
						<i
							class="layui-icon serachIcon"
							onclick="serachSheQuList()"
							></i
						>
					</div>
					<div class="sheQuList">
						<!-- <li id="12">
                                    <div class="layui-unselect layui-form-checkbox layui-form-checked" lay-skin="primary">
                                        <span>Harbour@金桥社区</span><i class="layui-icon layui-icon-ok"></i>
                                    </div>
                                </li> -->

						<ul style="display: block;" class="shequList0">
							<li
								onclick="choseSheQu('0','0','0ca2f21170de4218a7ad6e2e416555ba')"
								id="0ca2f21170de4218a7ad6e2e416555ba"
							>
								<div
									class="layui-unselect layui-form-checkbox layui-form-checked"
									lay-skin="primary"
								>
									<span class="shequName choseTitleColor"
										>Harbour@上海湾流社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','1','e796cfe3696d410b8fb404089b51a1db')"
								id="e796cfe3696d410b8fb404089b51a1db"
							>
								<div
									class="layui-unselect layui-form-checkbox layui-form-checked"
									lay-skin="primary"
								>
									<span class="shequName choseTitleColor"
										>测试店专用</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','2','65301D5F3B61684C2B8ACEBHF1548C1510B5')"
								id="65301D5F3B61684C2B8ACEBHF1548C1510B5"
							>
								<div
									class="layui-unselect layui-form-checkbox layui-form-checked"
									lay-skin="primary"
								>
									<span class="shequName choseTitleColor"
										>临平路社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','3','B5B9484D45119V41C1P885C91271B7E70CBB')"
								id="B5B9484D45119V41C1P885C91271B7E70CBB"
							>
								<div
									class="layui-unselect layui-form-checkbox layui-form-checked"
									lay-skin="primary"
								>
									<span class="shequName choseTitleColor"
										>大柏树</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','4','46DD5E20FAFB8A4EAE1B4EE3021D717FC86B')"
								id="46DD5E20FAFB8A4EAE1B4EE3021D717FC86B"
							>
								<div
									class="layui-unselect layui-form-checkbox layui-form-checked"
									lay-skin="primary"
								>
									<span class="shequName choseTitleColor"
										>测试大楼盘111</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','5','2358454DSF050Q4525KA81E58CAD43488C9B')"
								id="2358454DSF050Q4525KA81E58CAD43488C9B"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">碧桂园</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','6','E59AF602XB2F594EA2OB9D6P109CAD7C7F8A')"
								id="E59AF602XB2F594EA2OB9D6P109CAD7C7F8A"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">万科城花璟园</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','7','066D214144A00Z4130D9FD0R35470F37D427')"
								id="066D214144A00Z4130D9FD0R35470F37D427"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">上海多伦路社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','8','74B5EE4CU171CR4A9BJ9A52K880285276CE1')"
								id="74B5EE4CU171CR4A9BJ9A52K880285276CE1"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">日租对比</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li onclick="choseSheQu('0','9','1')" id="1">
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">光谷坐标城</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li onclick="choseSheQu('0','10','10')" id="10">
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Sorority@徐汇女神社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li onclick="choseSheQu('0','11','11')" id="11">
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Harbour@世纪公园社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li onclick="choseSheQu('0','12','14')" id="14">
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Elite@中山公园社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','13','076456D83B34FI4EE1AA7003D3901FDFFBFB')"
								id="076456D83B34FI4EE1AA7003D3901FDFFBFB"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>迪士尼度假区公寓</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','14','1ACFBB2DICAFD6476DC91DE659C083F91920')"
								id="1ACFBB2DICAFD6476DC91DE659C083F91920"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Harbour@呼兰路社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','15','2734AA7D21732N44C2CBDC4DC7C19B5EBD47')"
								id="2734AA7D21732N44C2CBDC4DC7C19B5EBD47"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">上海曼陀山庄</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','16','27BA35F1Y2A7E74759AA6A957FA108CAAEAC')"
								id="27BA35F1Y2A7E74759AA6A957FA108CAAEAC"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">世茂林屿岸</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','17','325841E45A336Y4597OB51B71EBFE4CF1AA9')"
								id="325841E45A336Y4597OB51B71EBFE4CF1AA9"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>星窝@共和花园社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','18','356FD58DCFC0CR46F1N98CCXDDCDB6D46160')"
								id="356FD58DCFC0CR46F1N98CCXDDCDB6D46160"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">宗科苑</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','19','37B8A193Y0430N44E7KB608RFE3C5E8CE4C8')"
								id="37B8A193Y0430N44E7KB608RFE3C5E8CE4C8"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">深圳星窝桃花岛</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','20','40706416S1B2164D68UA41BJCC524B965E38')"
								id="40706416S1B2164D68UA41BJCC524B965E38"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">上海名剑山庄</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','21','4200A974O5274Z43149AFB1IE5F559841018')"
								id="4200A974O5274Z43149AFB1IE5F559841018"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">光谷理想城</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','22','47D20526KB4BD746BBTAF43SE9545C10D830')"
								id="47D20526KB4BD746BBTAF43SE9545C10D830"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">金杨社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','23','52C6AD1EY3C33Y477AI9983I97BA8C73373F')"
								id="52C6AD1EY3C33Y477AI9983I97BA8C73373F"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>浦东嘉里中心社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','24','5388D005C9911F4991I9564B7F932ED1F309')"
								id="5388D005C9911F4991I9564B7F932ED1F309"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">测试新建楼盘</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','25','5752A7CBR9F90I4EAE68EB9K607C110D9ECD')"
								id="5752A7CBR9F90I4EAE68EB9K607C110D9ECD"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">测试签约类型</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','26','58860025N864FE4C4FBAD1BB8375709F5D5C')"
								id="58860025N864FE4C4FBAD1BB8375709F5D5C"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">深圳星窝测试03</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','27','5AC7DBE2ZBDC62417378FDCG97B02910C6FB')"
								id="5AC7DBE2ZBDC62417378FDCG97B02910C6FB"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">No.2测试社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','28','61F0601DF4CB77452BEBA94O8D8E7D8496EC')"
								id="61F0601DF4CB77452BEBA94O8D8E7D8496EC"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">万科佳都</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','29','67410BF1I6310F464EQA5F6V6CE4F05B30BF')"
								id="67410BF1I6310F464EQA5F6V6CE4F05B30BF"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">万科城花景苑</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','30','7A2FD4F93416BW4A6CB977E777318045F6A0')"
								id="7A2FD4F93416BW4A6CB977E777318045F6A0"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">测试社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','31','91B8C492P9931B404AZB214E37E3A204AD26')"
								id="91B8C492P9931B404AZB214E37E3A204AD26"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">上海桃花岛</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','32','9B603E07J46711465BP8CB1L8AA5D3F09498')"
								id="9B603E07J46711465BP8CB1L8AA5D3F09498"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">等二算法式</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','33','C1FD5FAEB5A5EO4599Q8195IDB8DD19AF969')"
								id="C1FD5FAEB5A5EO4599Q8195IDB8DD19AF969"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Harbour@聚丰园社区瑞典简约风号楼</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','34','C32D86FDNC2D7O4C07SBCF297B0078C89061')"
								id="C32D86FDNC2D7O4C07SBCF297B0078C89061"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Harbour@岭南社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','35','C61A41B46742D34733EB767O2E3B3D74BEB6')"
								id="C61A41B46742D34733EB767O2E3B3D74BEB6"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">星窝测试32312</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','36','CD486B8ATD94CH41916A54EL077478CEA497')"
								id="CD486B8ATD94CH41916A54EL077478CEA497"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">贝壳测试</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','37','CF626D4DH8782J4D0AA86CE982DBDB33FFDA')"
								id="CF626D4DH8782J4D0AA86CE982DBDB33FFDA"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">南京梧桐居测试</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','38','DAFFC4CFF8DD5W40ABY8DC4UAE527760B254')"
								id="DAFFC4CFF8DD5W40ABY8DC4UAE527760B254"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">地图找房03</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','39','DEB988A54EC35Z45716A0D8E7C989196E4E8')"
								id="DEB988A54EC35Z45716A0D8E7C989196E4E8"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">测试朝向</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','40','E1352AA6669B5D4D22NB4F3V86CD9B79048C')"
								id="E1352AA6669B5D4D22NB4F3V86CD9B79048C"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">地图找房04</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','41','E274C52CUF9D3I4A1FN82CC7C82C6F5BB546')"
								id="E274C52CUF9D3I4A1FN82CC7C82C6F5BB546"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">水电新规则测试</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','42','E93E303AP98E8G4FAAB9F516377586E8E27F')"
								id="E93E303AP98E8G4FAAB9F516377586E8E27F"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">静安豪华楼盘</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','43','F78BFFCDD7DB7F4C6AY854EOA8053C77940F')"
								id="F78BFFCDD7DB7F4C6AY854EOA8053C77940F"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">No.1测试社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','44','FC67BEFF7CCD4E4C87E9D28Q42B11E7792E1')"
								id="FC67BEFF7CCD4E4C87E9D28Q42B11E7792E1"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">决战光明顶</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','45','FCD5FC8ANBCF4E47B15BC99A21E8E826440D')"
								id="FCD5FC8ANBCF4E47B15BC99A21E8E826440D"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>测试地图找房我的关注02</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','46','FCDE1E3ENBA5844158XA1C7Q7FF7954BE685')"
								id="FCDE1E3ENBA5844158XA1C7Q7FF7954BE685"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Harbour@聚丰园社区瑞典简约风号</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','47','7F02FFC7Y5CEDY437CI94BC3E1AD48B94794')"
								id="7F02FFC7Y5CEDY437CI94BC3E1AD48B94794"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">迪士尼木兰公寓</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','48','78683348G6D0734136UB04AI9213677F149E')"
								id="78683348G6D0734136UB04AI9213677F149E"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>静安豪华楼盘NO.2</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','49','CA680088P6B18W42AE4854EW831E5DC75E5C')"
								id="CA680088P6B18W42AE4854EW831E5DC75E5C"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>徐汇女神社区NO.1</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('0','50','859F4430O2762P4D25FAAA5F040BA4A82668')"
								id="859F4430O2762P4D25FAAA5F040BA4A82668"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">外滩绝情谷</span
									><i class="layui-icon"></i>
								</div>
							</li>
						</ul>
						<ul style="display: none;" class="shequList1">
							<li
								onclick="choseSheQu('1','0','29896FADDD2692443B8B13E2551313166B4D')"
								id="29896FADDD2692443B8B13E2551313166B4D"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">测试专用楼盘</span
									><i class="layui-icon"></i>
								</div>
							</li>
						</ul>
						<ul style="display: none;" class="shequList2">
							<li onclick="choseSheQu('2','0','20')" id="20">
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Elite&amp;Sorority@彩田社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('2','1','0FE55518IF1D2C4D0DZ83D8BAFA2C95E7F43')"
								id="0FE55518IF1D2C4D0DZ83D8BAFA2C95E7F43"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">Bean@华天社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('2','2','6812FB9FMCC9CG4EA7E95B4Z42AE6B5037C6')"
								id="6812FB9FMCC9CG4EA7E95B4Z42AE6B5037C6"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">深圳星窝测试01</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('2','3','B6A38353N2823T4B09AA40DF5E27C669A0EF')"
								id="B6A38353N2823T4B09AA40DF5E27C669A0EF"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">深圳星窝测试02</span
									><i class="layui-icon"></i>
								</div>
							</li>
						</ul>
						<ul style="display: none;" class="shequList3">
							<li onclick="choseSheQu('3','0','28')" id="28">
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Marina@三里屯院子</span
									><i class="layui-icon"></i>
								</div>
							</li>
						</ul>
						<ul style="display: none;" class="shequList4">
							<li
								onclick="choseSheQu('4','0','0D7316ACG7CF5J421DD950ATA8853251F72A')"
								id="0D7316ACG7CF5J421DD950ATA8853251F72A"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">1214贝壳测试</span
									><i class="layui-icon"></i>
								</div>
							</li>
						</ul>
						<ul style="display: none;" class="shequList5">
							<li
								onclick="choseSheQu('5','0','20734A6BCDA2F34FF92A90F630AA6C78430D')"
								id="20734A6BCDA2F34FF92A90F630AA6C78430D"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName">测试房价回跳</span
									><i class="layui-icon"></i>
								</div>
							</li>
							<li
								onclick="choseSheQu('5','1','223C18C7MD598H47FEMB75B2B838E431E0E6')"
								id="223C18C7MD598H47FEMB75B2B838E431E0E6"
							>
								<div
									class="layui-unselect layui-form-checkbox"
									lay-skin="primary"
								>
									<span class="shequName"
										>Harbour@1980社区</span
									><i class="layui-icon"></i>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="allChoseBtn">
				<div class="choseBtn">
					<span class="quanxuanIcon" onclick="choseCurrentAll()"
						><img src="images/quanxuan.png" alt="" />全选</span
					>
					<span class="qingkongIcon" onclick="deleteCurrentAll()"
						><img src="images/qingkong.png" alt="" />清空</span
					>
					<span class="fanxuanIcon" onclick="reverseCurrentAll()"
						><img src="images/fanxuan.png" alt="" />反选</span
					>
				</div>
				<div class="confirmChose" onclick="confirmALLchoseSheQu()">
					<button>确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "choseHourseId",
	data() {
		return {};
	},
	watch: {},

	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
