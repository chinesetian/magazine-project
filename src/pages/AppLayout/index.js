import React from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Tabs,Spin } from 'antd'
import { uuid } from '../../utils/uuid'

import './index.less'

const TabPane = Tabs.TabPane
@withRouter
@inject('MenuStore')
@observer
class LayoutView extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        ModuleComponent: null,
        moduelName: null,
        key: uuid()
    }
    componentWillMount() {
        this.authComouted(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.authComouted(nextProps)
    }
    authComouted(props) {
        debugger
        let { history, MenuStore, match } = props;
        if (this.state.moduelName !== match.params.module) {
            let module = MenuStore.getMenuForName(match.params.module);
            // let module = MenuStore.getMenuForUrl(match.url);
            let ModuleComponent
            if (module && module.component) {
                ModuleComponent = module.component
                this.setState({
                    ModuleComponent,
                    moduelName: match.params.module
                })
            } else {
                history.replace('/home/404')
            }
        }
    }

    render() {
        let { ModuleComponent } = this.state
        return ModuleComponent ? <ModuleComponent key={this.state.key} {...this.props}/> :null
    }
}

export default LayoutView
