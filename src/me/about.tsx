import * as React from 'react';
import { Page, nav } from 'tonva';
import ReactMarkdown from 'react-markdown/with-html';
import logo from '../images/logo.png';

const content = `百灵威科技有限公司是一家致力于研发和生产化学及生命科学相关产品，集敏捷制造、全球营销和现代物流为一体的高科技企业。

百灵威秉承“诚实守信、开拓创新、合作共赢、实现卓越”的价值观，致力于与化学、生物医药、精细化工、食品工业、现代农业、电子、日化、石化、纺织、生命科学、环境保护、疾病控制、新能源、新材料、航空航天等领域的客户建立互信、长久的合作关系，为实现“促进科技与工业发展，造福人类”的使命而不懈努力！

<h2>企业使命</h2>

促进科技与工业发展，造福人类

<h2>企业愿景</h2>

J＆K Scientific想象一个所有人都能在安全和清洁的环境中过上健康，有益的生活的世界。我们致力于纪念未来，努力改善我们的孩子及其子女的世界。当我们与客户合作解决他们的生产需求时，这个愿景指导我们的行动。

<h2>核心价值观</h2>

<style>
* {
  box-sizing: border-box;
}
.box {
  float: left;
  width: 25%;
  padding: 1px;
  text-align: center;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>

<div class="clearfix">
  <div class="box" style="background-color:#bbb">
  <h3>诚实守信</h3>
  <p style="color:grey;font-size: 1rem;">诚实守信</p>
  </div>
  <div class="box" style="background-color:#ccc">
      <h3>开拓创新</h3>
  <p style="color:grey;font-size: 1rem;">开拓创新</p>
  </div>
  <div class="box" style="background-color:#ddd">
      <h3>合作共赢</h3>
  <p style="color:grey;font-size: 1rem;">合作共赢</p>
  </div>
  <div class="box" style="background-color:#eee">
      <h3>实现卓越</h3>
  <p style="color:grey;font-size: 1rem;">实现卓越</p>
  </div>
</div>

<h2>国际营销中心</h2>

<style>
img {
  float: left;
}
</style>

<img src="http://47.92.87.6/wordpress/wp-content/uploads/2019/05/World-Wide-Distribution.png" alt="World Wide Distribution"
    title="ww distribution" class="img-fluid"/>
    百灵威在中国内地、香港，欧洲及北美等多个国家和地区设有物流中心，实行专业化、个性化的一站式服务，为全球超过200,000 名科技和工业领域的客户提供产品资源及配套技术服务。百灵威具有国际化学技术资源背景及强大的国际操控能力，可以帮助有特殊要求的客户从国外单独进口特种化学产品，为项目试验乃至工业化应用提供强大支持。百灵威具有强大的专业化学品定制、采购和出口能力，更具备众多国际性合作项目（如多国化学实验室联合开发战略性化合物）的运作能力，百灵威愿与中国的同行携 手，共创我国化学事业更加辉煌的未来！

<h2>国际认证</h2>

<h3>ISO 9001</h3>

【配图】
`

export class About extends React.Component {
    render() {
        let right = null;
        return <Page header="关于百灵威" right={right}>
            <div className='bg-white p-3'>
                <img className="h-3c position-absolute" src={logo} />
                <div className="h3 flex-fill text-center">
                    <span className="text-primary mr-3">百灵威集团</span>
                </div>
                <ReactMarkdown className="mt-5" source={content} escapeHtml={false} />
            </div>
        </Page>;
    }
}